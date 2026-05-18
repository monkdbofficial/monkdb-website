import { NextResponse } from 'next/server'
import { listResources } from '@/lib/resources-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await listResources()
    return NextResponse.json({ items })
  } catch (e) {
    console.error('GET /api/resources failed', e)
    return NextResponse.json(
      { items: [], error: 'unavailable' },
      { status: 500 },
    )
  }
}
