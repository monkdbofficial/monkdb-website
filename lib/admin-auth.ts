import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'mdb_admin_session'

function getSecret(): string {
  const s = process.env.NEXTAUTH_SECRET || process.env.ADMIN_SESSION_SECRET
  if (!s) {
    throw new Error(
      'NEXTAUTH_SECRET (or ADMIN_SESSION_SECRET) must be set in .env to sign admin sessions.',
    )
  }
  return s
}

export function sessionToken(): string {
  return createHmac('sha256', getSecret()).update('admin:v1').digest('hex')
}

export function verifySessionCookie(value: string | undefined): boolean {
  if (!value) return false
  const expected = sessionToken()
  if (value.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
}

export async function isAdminRequest(): Promise<boolean> {
  const c = await cookies()
  return verifySessionCookie(c.get(ADMIN_COOKIE)?.value)
}
