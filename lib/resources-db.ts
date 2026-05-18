import { Collection, ObjectId } from 'mongodb'
import clientPromise from './mongodb'
import type {
  ResourceItem,
  ResourceKind,
} from '@/content/resourceLibrary'

const DB_NAME = process.env.MONGODB_DB || 'monkdb_site'
const COLLECTION = 'resources'

export type ResourceDoc = {
  _id?: ObjectId
  kind: ResourceKind
  title: string
  summary: string
  url: string
  meta?: string
  body?: string
  createdAt: Date
  updatedAt?: Date
}

async function getCollection(): Promise<Collection<ResourceDoc>> {
  const client = await clientPromise
  return client.db(DB_NAME).collection<ResourceDoc>(COLLECTION)
}

function toItem(doc: ResourceDoc): ResourceItem {
  return {
    id: doc._id?.toString() ?? '',
    kind: doc.kind,
    title: doc.title,
    summary: doc.summary,
    url: doc.url,
    meta: doc.meta,
    body: doc.body,
  }
}

export async function listResources(): Promise<ResourceItem[]> {
  const col = await getCollection()
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray()
  return docs.map(toItem)
}

export async function getResource(id: string): Promise<ResourceItem | null> {
  if (!ObjectId.isValid(id)) return null
  const col = await getCollection()
  const doc = await col.findOne({ _id: new ObjectId(id) })
  return doc ? toItem(doc) : null
}

export async function createResource(
  input: Omit<ResourceDoc, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<ResourceItem> {
  const col = await getCollection()
  const doc: ResourceDoc = { ...input, createdAt: new Date() }
  const res = await col.insertOne(doc)
  return toItem({ ...doc, _id: res.insertedId })
}

export async function updateResource(
  id: string,
  patch: Partial<Omit<ResourceDoc, '_id' | 'createdAt'>>,
): Promise<ResourceItem | null> {
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

export async function deleteResource(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false
  const col = await getCollection()
  const res = await col.deleteOne({ _id: new ObjectId(id) })
  return res.deletedCount > 0
}
