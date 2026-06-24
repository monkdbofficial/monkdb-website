import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import {
  createPress,
  deletePress,
  listPress,
  updatePress,
} from '@/lib/press-db'
import type { PressCategory } from '@/content/press'
import { PRESS_CATEGORY_LABELS } from '@/content/press'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CATEGORIES = Object.keys(PRESS_CATEGORY_LABELS) as PressCategory[]
const MAX = { title: 200, excerpt: 600, imageUrl: 800, linkUrl: 800 }
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function clamp(v: unknown, max: number): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

function normalizeDate(v: unknown): string {
  const s = clamp(v, 10)
  return DATE_RE.test(s) ? s : ''
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
    const items = await listPress()
    return NextResponse.json({ items })
  } catch (e) {
    console.error('admin GET /press failed', e)
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

  const category = body.category as PressCategory
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: 'invalid_category' }, { status: 400 })
  }
  const title = clamp(body.title, MAX.title)
  const excerpt = clamp(body.excerpt, MAX.excerpt)
  const date = normalizeDate(body.date)
  const imageUrl = clamp(body.imageUrl, MAX.imageUrl)
  const linkUrl = clamp(body.linkUrl, MAX.linkUrl)

  if (!title || !excerpt || !date) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const item = await createPress({
      category,
      title,
      excerpt,
      date,
      imageUrl: imageUrl || undefined,
      linkUrl: linkUrl || undefined,
    })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('admin POST /press failed', e)
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
  const category = body.category as PressCategory
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: 'invalid_category' }, { status: 400 })
  }
  const title = clamp(body.title, MAX.title)
  const excerpt = clamp(body.excerpt, MAX.excerpt)
  const date = normalizeDate(body.date)
  const imageUrl = clamp(body.imageUrl, MAX.imageUrl)
  const linkUrl = clamp(body.linkUrl, MAX.linkUrl)

  if (!title || !excerpt || !date) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const item = await updatePress(id, {
      category,
      title,
      excerpt,
      date,
      imageUrl: imageUrl || undefined,
      linkUrl: linkUrl || undefined,
    })
    if (!item) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ item })
  } catch (e) {
    console.error('admin PATCH /press failed', e)
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
    const ok = await deletePress(id)
    return NextResponse.json({ ok })
  } catch (e) {
    console.error('admin DELETE /press failed', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}
