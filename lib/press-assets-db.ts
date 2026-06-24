import { Collection, ObjectId } from 'mongodb'
import clientPromise from './mongodb'
import type { PressAssetItem } from '@/content/pressAssets'

const DB_NAME = process.env.MONGODB_DB || 'monkdb_site'
const COLLECTION = 'pressAssets'

export type PressAssetDoc = {
  _id?: ObjectId
  label: string
  size?: string
  url?: string
  createdAt: Date
  updatedAt?: Date
}

async function getCollection(): Promise<Collection<PressAssetDoc>> {
  const client = await clientPromise
  return client.db(DB_NAME).collection<PressAssetDoc>(COLLECTION)
}

function toItem(doc: PressAssetDoc): PressAssetItem {
  return {
    id: doc._id?.toString() ?? '',
    label: doc.label,
    size: doc.size,
    url: doc.url,
  }
}

export async function listPressAssets(): Promise<PressAssetItem[]> {
  const col = await getCollection()
  // Oldest first so the curated order in the media kit is preserved.
  const docs = await col.find({}).sort({ createdAt: 1 }).toArray()
  return docs.map(toItem)
}

export async function createPressAsset(
  input: Omit<PressAssetDoc, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<PressAssetItem> {
  const col = await getCollection()
  const doc: PressAssetDoc = { ...input, createdAt: new Date() }
  const res = await col.insertOne(doc)
  return toItem({ ...doc, _id: res.insertedId })
}

export async function updatePressAsset(
  id: string,
  patch: Partial<Omit<PressAssetDoc, '_id' | 'createdAt'>>,
): Promise<PressAssetItem | null> {
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

export async function deletePressAsset(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false
  const col = await getCollection()
  const res = await col.deleteOne({ _id: new ObjectId(id) })
  return res.deletedCount > 0
}
