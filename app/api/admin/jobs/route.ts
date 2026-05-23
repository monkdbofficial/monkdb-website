import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import {
  createJob,
  deleteJob,
  listJobs,
  updateJob,
} from '@/lib/jobs-db'
import type { JobTeam } from '@/content/jobs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TEAMS: JobTeam[] = ['engineering', 'product', 'gtm', 'operations']
const MAX = { title: 160, location: 120, type: 60, applyUrl: 800 }

function clamp(v: unknown, max: number): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

async function requireAdmin() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  return null
}

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const items = await listJobs()
    return NextResponse.json({ items })
  } catch (e) {
    console.error('admin GET /jobs failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin()
  if (guard) return guard

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  const team = body.team as JobTeam
  if (!TEAMS.includes(team)) {
    return NextResponse.json({ error: 'invalid_team' }, { status: 400 })
  }
  const title = clamp(body.title, MAX.title)
  const location = clamp(body.location, MAX.location)
  const type = clamp(body.type, MAX.type) || 'Full-time'
  const applyUrl = clamp(body.applyUrl, MAX.applyUrl)

  if (!title || !location) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const item = await createJob({
      team,
      title,
      location,
      type,
      applyUrl: applyUrl || undefined,
    })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('admin POST /jobs failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const guard = await requireAdmin()
  if (guard) return guard

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  const id = typeof body.id === 'string' ? body.id : ''
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 })
  }
  const team = body.team as JobTeam
  if (!TEAMS.includes(team)) {
    return NextResponse.json({ error: 'invalid_team' }, { status: 400 })
  }
  const title = clamp(body.title, MAX.title)
  const location = clamp(body.location, MAX.location)
  const type = clamp(body.type, MAX.type) || 'Full-time'
  const applyUrl = clamp(body.applyUrl, MAX.applyUrl)

  if (!title || !location) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const item = await updateJob(id, {
      team,
      title,
      location,
      type,
      applyUrl: applyUrl || undefined,
    })
    if (!item) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('admin PATCH /jobs failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin()
  if (guard) return guard

  const url = new URL(req.url)
  const id = url.searchParams.get('id') ?? ''
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 })
  }

  try {
    const ok = await deleteJob(id)
    return NextResponse.json({ ok })
  } catch (e) {
    console.error('admin DELETE /jobs failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}
