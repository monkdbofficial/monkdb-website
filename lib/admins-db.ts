import { Collection } from 'mongodb'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import clientPromise from './mongodb'

const DB_NAME = process.env.MONGODB_DB || 'monkdb_site'
const COLLECTION = 'admins'

const DEFAULT_USERNAME = 'admin'
const DEFAULT_PASSWORD = 'monkdb-admin'

export type AdminDoc = {
  username: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

async function getCollection(): Promise<Collection<AdminDoc>> {
  const client = await clientPromise
  const col = client.db(DB_NAME).collection<AdminDoc>(COLLECTION)
  await col.createIndex({ username: 1 }, { unique: true }).catch(() => {})
  return col
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

function comparePassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  let computed: Buffer
  try {
    computed = Buffer.from(
      scryptSync(password, salt, 64).toString('hex'),
      'hex',
    )
  } catch {
    return false
  }
  const expected = Buffer.from(hash, 'hex')
  if (expected.length !== computed.length) return false
  return timingSafeEqual(expected, computed)
}

let _seedPromise: Promise<void> | null = null

async function ensureDefaultAdmin(): Promise<void> {
  if (_seedPromise) return _seedPromise
  _seedPromise = (async () => {
    const col = await getCollection()
    const count = await col.estimatedDocumentCount()
    if (count > 0) return
    const now = new Date()
    await col.insertOne({
      username: DEFAULT_USERNAME,
      passwordHash: hashPassword(DEFAULT_PASSWORD),
      createdAt: now,
      updatedAt: now,
    })
    console.log(
      `[admins-db] seeded default admin → username: "${DEFAULT_USERNAME}", password: "${DEFAULT_PASSWORD}". ` +
        `Change it from MongoDB (collection: admins) or via the change-password endpoint.`,
    )
  })()
  return _seedPromise
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  await ensureDefaultAdmin()
  const col = await getCollection()
  const doc = await col.findOne({ username: DEFAULT_USERNAME })
  if (!doc) return false
  return comparePassword(password, doc.passwordHash)
}

export async function setAdminPassword(newPassword: string): Promise<void> {
  await ensureDefaultAdmin()
  const col = await getCollection()
  await col.updateOne(
    { username: DEFAULT_USERNAME },
    {
      $set: {
        passwordHash: hashPassword(newPassword),
        updatedAt: new Date(),
      },
    },
  )
}
