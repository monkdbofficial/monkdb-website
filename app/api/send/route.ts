import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MAX = {
  name: 120,
  company: 200,
  email: 320,
  phone: 40,
  role: 120,
  workload: 120,
  message: 5000,
}

function clamp(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot — bots fill the hidden "website" field; real users never see it.
  // Return 200 so spammers don't learn the trick, but skip sending.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ success: true })
  }

  const name = clamp(body.name, MAX.name)
  const company = clamp(body.company, MAX.company)
  const email = clamp(body.email, MAX.email).toLowerCase()
  const phone = clamp(body.phone, MAX.phone)
  const role = clamp(body.role, MAX.role)
  const workload = clamp(body.workload, MAX.workload)
  const message = clamp(body.message, MAX.message)
  const acceptCommunications = body.acceptCommunications === true

  if (!name || !company || !email || !message) {
    return NextResponse.json(
      { error: 'Please fill in your name, company, email, and message.' },
      { status: 400 },
    )
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const apiKey =
    process.env.RESEND_API_KEY ?? 're_T6AeaNay_LiEEkxadjMWLLAsfjcsDUaya'
  const from = process.env.CONTACT_FROM_EMAIL ?? 'MonkDB <onboarding@resend.dev>'
  const to = process.env.CONTACT_TO_EMAIL ?? 'support@monkdb.com'
  const resend = new Resend(apiKey)

  const rows: [string, string][] = [
    ['Name', name],
    ['Company', company],
    ['Email', email],
    ['Phone', phone || 'Not provided'],
    ['Role', role || 'Not provided'],
    ['Workload', workload || 'Not provided'],
    ['Accepts Communications', acceptCommunications ? 'Yes' : 'No'],
  ]

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#0A2280;">
      <h2 style="font-weight:400;margin:0 0 16px;color:#0A2280;">New contact form submission</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #E5E7EB;background:#F8F4F0;font-weight:600;width:160px;">${escapeHtml(k)}</td>
            <td style="padding:8px 12px;border:1px solid #E5E7EB;">${escapeHtml(v)}</td>
          </tr>`,
          )
          .join('')}
      </table>
      <h3 style="font-weight:500;margin:0 0 8px;color:#0A2280;">Message</h3>
      <div style="padding:14px 16px;border:1px solid #E5E7EB;background:#FAFAFA;border-radius:8px;white-space:pre-wrap;line-height:1.55;">${escapeHtml(message)}</div>
      <p style="color:#6B7280;font-size:12px;margin-top:20px;">
        Reply to this email to respond directly to ${escapeHtml(name)} (${escapeHtml(email)}).
      </p>
    </div>
  `

  const text = `New contact form submission

${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}

Message:
${message}

Reply to this email to respond directly to ${name} (${email}).`

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Contact form: ${name} from ${company}`,
      html,
      text,
    })
    if (error) {
      console.error('[api/send] resend error:', error)
      return NextResponse.json(
        { error: 'Could not send your message. Please try again or email sales@monkdb.com.' },
        { status: 502 },
      )
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/send] send failed:', err)
    return NextResponse.json(
      { error: 'Could not send your message. Please try again or email sales@monkdb.com.' },
      { status: 500 },
    )
  }
}
