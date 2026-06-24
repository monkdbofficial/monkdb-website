import { Collection, ObjectId } from 'mongodb'
import clientPromise from './mongodb'
import type { PressCategory, PressItem } from '@/content/press'

const DB_NAME = process.env.MONGODB_DB || 'monkdb_site'
const COLLECTION = 'press'

export type PressDoc = {
  _id?: ObjectId
  category: PressCategory
  title: string
  excerpt: string
  date: string
  imageUrl?: string
  linkUrl?: string
  createdAt: Date
  updatedAt?: Date
}

async function getCollection(): Promise<Collection<PressDoc>> {
  const client = await clientPromise
  return client.db(DB_NAME).collection<PressDoc>(COLLECTION)
}

function toItem(doc: PressDoc): PressItem {
  return {
    id: doc._id?.toString() ?? '',
    category: doc.category,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    imageUrl: doc.imageUrl,
    linkUrl: doc.linkUrl,
  }
}

export async function listPress(): Promise<PressItem[]> {
  const col = await getCollection()
  // Newest first by editorial date, then by insertion time.
  const docs = await col
    .find({})
    .sort({ date: -1, createdAt: -1 })
    .toArray()
  return docs.map(toItem)
}

export async function createPress(
  input: Omit<PressDoc, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<PressItem> {
  const col = await getCollection()
  const doc: PressDoc = { ...input, createdAt: new Date() }
  const res = await col.insertOne(doc)
  return toItem({ ...doc, _id: res.insertedId })
}

export async function updatePress(
  id: string,
  patch: Partial<Omit<PressDoc, '_id' | 'createdAt'>>,
): Promise<PressItem | null> {
  if (!ObjectId.isValid(id)) return null
  const col = await getCollection()
  const $set = { ...patch, updatedAt: new Date() }
  const doc = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set },
    { returnDocument: 'after' },
  )
  return doc ? toItem(doc) : null
}

export async function deletePress(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false
  const col = await getCollection()
  const res = await col.deleteOne({ _id: new ObjectId(id) })
  return res.deletedCount > 0
}
