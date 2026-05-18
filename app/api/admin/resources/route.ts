import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import {
  createResource,
  deleteResource,
  listResources,
  updateResource,
} from '@/lib/resources-db'
import type { ResourceKind } from '@/content/resourceLibrary'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const KINDS: ResourceKind[] = ['whitepaper', 'github', 'demo', 'video']
const MAX = { title: 160, summary: 600, url: 800, meta: 80, body: 8000 }

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
    const items = await listResources()
    return NextResponse.json({ items })
  } catch (e) {
    console.error('admin GET /resources failed', e)
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

  const kind = body.kind as ResourceKind
  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: 'invalid_kind' }, { status: 400 })
  }
  const title = clamp(body.title, MAX.title)
  const summary = clamp(body.summary, MAX.summary)
  const url = clamp(body.url, MAX.url)
  const meta = clamp(body.meta, MAX.meta)
  const longBody = clamp(body.body, MAX.body)

  if (!title || !summary || !url) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const item = await createResource({
      kind,
      title,
      summary,
      url,
      meta: meta || undefined,
      body: longBody || undefined,
    })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('admin POST /resources failed', e)
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

  const patch: Record<string, unknown> = {}
  if (body.kind !== undefined) {
    const k = body.kind as ResourceKind
    if (!KINDS.includes(k)) {
      return NextResponse.json({ error: 'invalid_kind' }, { status: 400 })
    }
    patch.kind = k
  }
  if (body.title !== undefined) patch.title = clamp(body.title, MAX.title)
  if (body.summary !== undefined) patch.summary = clamp(body.summary, MAX.summary)
  if (body.url !== undefined) patch.url = clamp(body.url, MAX.url)
  if (body.meta !== undefined) patch.meta = clamp(body.meta, MAX.meta) || undefined
  if (body.body !== undefined) patch.body = clamp(body.body, MAX.body) || undefined

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'no_changes' }, { status: 400 })
  }

  try {
    const item = await updateResource(id, patch)
    if (!item) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('admin PATCH /resources failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin()
  if (guard) return guard

  const url = new URL(req.url)
  const id = url.searchParams.get('id') || ''
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 })
  }

  try {
    const ok = await deleteResource(id)
    if (!ok) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('admin DELETE /resources failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}
