import { NextResponse } from 'next/server'
import { listJobs } from '@/lib/jobs-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  try {
    const items = await listJobs()
    return NextResponse.json({ items })
  } catch (e) {
    console.error('public GET /jobs failed', e)
    return NextResponse.json({ items: [] })
  }
}
