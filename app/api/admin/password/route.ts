import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { setAdminPassword, verifyAdminPassword } from '@/lib/admins-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  const current = typeof body.current === 'string' ? body.current : ''
  const next = typeof body.next === 'string' ? body.next : ''

  if (next.length < 8) {
    return NextResponse.json({ error: 'too_short' }, { status: 400 })
  }

  try {
    const ok = await verifyAdminPassword(current)
    if (!ok) {
      return NextResponse.json({ error: 'wrong_current' }, { status: 400 })
    }
    await setAdminPassword(next)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('admin POST /password failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}
