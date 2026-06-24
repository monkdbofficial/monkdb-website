import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import {
  createPressAsset,
  deletePressAsset,
  listPressAssets,
  updatePressAsset,
} from '@/lib/press-assets-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX = { label: 120, size: 40, url: 800 }

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
    const items = await listPressAssets()
    return NextResponse.json({ items })
  } catch (e) {
    console.error('admin GET /press-assets failed', e)
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

  const label = clamp(body.label, MAX.label)
  const size = clamp(body.size, MAX.size)
  const url = clamp(body.url, MAX.url)

  if (!label) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const item = await createPressAsset({
      label,
      size: size || undefined,
      url: url || undefined,
    })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('admin POST /press-assets failed', e)
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
  const label = clamp(body.label, MAX.label)
  const size = clamp(body.size, MAX.size)
  const url = clamp(body.url, MAX.url)

  if (!label) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const item = await updatePressAsset(id, {
      label,
      size: size || undefined,
      url: url || undefined,
    })
    if (!item) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('admin PATCH /press-assets failed', e)
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
    const ok = await deletePressAsset(id)
    return NextResponse.json({ ok })
  } catch (e) {
    console.error('admin DELETE /press-assets failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}
