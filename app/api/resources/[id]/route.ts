import { NextResponse } from 'next/server'
import { getResource } from '@/lib/resources-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params
  try {
    const item = await getResource(id)
    if (!item) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('GET /api/resources/[id] failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}
