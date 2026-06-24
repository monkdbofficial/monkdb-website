import { NextResponse } from 'next/server'
import { listPress } from '@/lib/press-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await listPress()
    return NextResponse.json({ items })
  } catch (e) {
    console.error('public GET /press failed', e)
    return NextResponse.json({ items: [] })
  }
}
