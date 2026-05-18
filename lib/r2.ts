import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

function required(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is not set in .env`)
  return v
}

let _client: S3Client | null = null

function getClient(): S3Client {
  if (_client) return _client
  const accountId = required('R2_ACCOUNT_ID')
  _client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: required('R2_ACCESS_KEY_ID'),
      secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
    },
  })
  return _client
}

const SAFE_NAME = /[^a-zA-Z0-9._-]+/g

function safeFilename(name: string): string {
  const base = name.replace(SAFE_NAME, '-').replace(/-+/g, '-').toLowerCase()
  return base.slice(0, 120) || 'file'
}

export async function uploadToR2(
  file: File,
  folder = 'resources',
): Promise<{ key: string; url: string }> {
  const bucket = required('R2_BUCKET_NAME')
  const publicBase = required('R2_PUBLIC_URL').replace(/\/+$/, '')

  const buffer = Buffer.from(await file.arrayBuffer())
  const ts = Date.now()
  const key = `${folder}/${ts}-${safeFilename(file.name)}`

  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream',
    }),
  )

  return { key, url: `${publicBase}/${key}` }
}
