import { MongoClient, type MongoClientOptions } from 'mongodb'

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function createClient() {
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Add it to .env.local before using the database.',
    )
  }
  return new MongoClient(uri, options).connect()
}

// Reuse one MongoClient across hot reloads in dev; one per server in prod.
const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === 'development'
    ? (global._mongoClientPromise ??= createClient())
    : createClient()

export default clientPromise
