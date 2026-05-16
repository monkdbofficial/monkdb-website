import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      company,
      phone,
      role,
      workload,
      message,
      acceptCommunications,
    } = body ?? {}

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured. Set RESEND_API_KEY in .env.local.' },
        { status: 500 },
      )
    }
    const resend = new Resend(apiKey)

    const from = process.env.CONTACT_FROM_EMAIL ?? 'MonkDB <onboarding@resend.dev>'
    const to = process.env.CONTACT_TO_EMAIL ?? 'support@monkdb.com'

    await resend.emails.send({
      from,
      to: [to],
      replyTo: typeof email === 'string' ? email : undefined,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name ?? ''}</p>
        <p><strong>Email:</strong> ${email ?? ''}</p>
        <p><strong>Company:</strong> ${company ?? ''}</p>
        <p><strong>Phone:</strong> ${phone ?? 'Not provided'}</p>
        <p><strong>Role:</strong> ${role ?? 'Not provided'}</p>
        <p><strong>Workload:</strong> ${workload ?? 'Not provided'}</p>
        <p><strong>Message:</strong> ${message ?? ''}</p>
        <p><strong>Accepts Communications:</strong> ${
          acceptCommunications ? 'Yes' : 'No'
        }</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[api/send] error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}
