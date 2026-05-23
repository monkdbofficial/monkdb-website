import { Collection, ObjectId } from 'mongodb'
import clientPromise from './mongodb'
import type { JobItem, JobTeam } from '@/content/jobs'

const DB_NAME = process.env.MONGODB_DB || 'monkdb_site'
const COLLECTION = 'jobs'

export type JobDoc = {
  _id?: ObjectId
  team: JobTeam
  title: string
  location: string
  type: string
  applyUrl?: string
  createdAt: Date
  updatedAt?: Date
}

async function getCollection(): Promise<Collection<JobDoc>> {
  const client = await clientPromise
  return client.db(DB_NAME).collection<JobDoc>(COLLECTION)
}

function toItem(doc: JobDoc): JobItem {
  return {
    id: doc._id?.toString() ?? '',
    team: doc.team,
    title: doc.title,
    location: doc.location,
    type: doc.type,
    applyUrl: doc.applyUrl,
  }
}

export async function listJobs(): Promise<JobItem[]> {
  const col = await getCollection()
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray()
  return docs.map(toItem)
}

export async function createJob(
  input: Omit<JobDoc, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<JobItem> {
  const col = await getCollection()
  const doc: JobDoc = { ...input, createdAt: new Date() }
  const res = await col.insertOne(doc)
  return toItem({ ...doc, _id: res.insertedId })
}

export async function updateJob(
  id: string,
  patch: Partial<Omit<JobDoc, '_id' | 'createdAt'>>,
): Promise<JobItem | null> {
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

export async function deleteJob(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false
  const col = await getCollection()
  const res = await col.deleteOne({ _id: new ObjectId(id) })
  return res.deletedCount > 0
}
