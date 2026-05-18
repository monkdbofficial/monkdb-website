import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, sessionToken } from '@/lib/admin-auth'
import { verifyAdminPassword } from '@/lib/admins-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let password = ''
  try {
    const body = (await req.json()) as { password?: unknown }
    if (typeof body.password === 'string') password = body.password
  } catch {
    // ignore
  }

  let ok = false
  if (password) {
    try {
      ok = await verifyAdminPassword(password)
    } catch (e) {
      console.error('[admin login] verify failed', e)
    }
  }

  if (!ok) {
    // brief delay to slow brute force
    await new Promise((r) => setTimeout(r, 400))
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: sessionToken(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12, // 12 hours
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return res
}
