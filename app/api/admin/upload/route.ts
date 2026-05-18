import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { uploadToR2 } from '@/lib/r2'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BYTES = 25 * 1024 * 1024 // 25 MB

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'bad_form' }, { status: 400 })
  }

  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'missing_file' }, { status: 400 })
  }
  if (file.size === 0) {
    return NextResponse.json({ error: 'empty_file' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'too_large' }, { status: 413 })
  }

  const folderRaw = form.get('folder')
  const folder =
    typeof folderRaw === 'string' && /^[a-z0-9-]{1,32}$/.test(folderRaw)
      ? folderRaw
      : 'resources'

  try {
    const { url, key } = await uploadToR2(file, folder)
    return NextResponse.json({ url, key })
  } catch (e) {
    console.error('admin POST /upload failed', e)
    const msg = e instanceof Error ? e.message : 'r2_error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
