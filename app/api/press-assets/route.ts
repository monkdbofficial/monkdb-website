import { NextResponse } from 'next/server'
import { listPressAssets } from '@/lib/press-assets-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await listPressAssets()
    return NextResponse.json({ items })
  } catch (e) {
    console.error('public GET /press-assets failed', e)
    return NextResponse.json({ items: [] })
  }
}
