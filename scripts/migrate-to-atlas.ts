import mongoose from "mongoose";

const LOCAL_URI = "mongodb://localhost:27017/monkdb";
const ATLAS_URI =
  "mongodb+srv://suryakantcse22:YR49qBA5h4tojMjD@cluster0.3ejopwu.mongodb.net/monkdb?retryWrites=true&w=majority";

async function migrateData() {
  try {
    console.log("🔄 Starting migration from local MongoDB to Atlas...\n");

    // Connect to local MongoDB
    console.log("📡 Connecting to local MongoDB...");
    const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log("✅ Connected to local MongoDB\n");

    // Connect to Atlas
    console.log("📡 Connecting to MongoDB Atlas...");
    const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
    console.log("✅ Connected to MongoDB Atlas\n");

    // Get all collections from local DB
    const collections = await localConn.db.listCollections().toArray();
    console.log(`📦 Found ${collections.length} collections to migrate\n`);

    let totalDocsMigrated = 0;

    // Migrate each collection
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;

      // Skip system collections
      if (collectionName.startsWith("system.")) {
        console.log(`⏭️  Skipping system collection: ${collectionName}`);
        continue;
      }

      const localCollection = localConn.db.collection(collectionName);
      const atlasCollection = atlasConn.db.collection(collectionName);

      // Get documents from local
      const documents = await localCollection.find({}).toArray();

      if (documents.length === 0) {
        console.log(`📭 ${collectionName}: No documents to migrate`);
        continue;
      }

      console.log(
        `📤 Migrating ${documents.length} documents from ${collectionName}...`
      );

      // Clear existing data in Atlas collection (optional - remove if you want to keep existing data)
      const existingCount = await atlasCollection.countDocuments();
      if (existingCount > 0) {
        console.log(
          `⚠️  ${collectionName}: Found ${existingCount} existing documents in Atlas. Clearing...`
        );
        await atlasCollection.deleteMany({});
      }

      // Insert documents to Atlas
      if (documents.length > 0) {
        await atlasCollection.insertMany(documents);
        console.log(`✅ ${collectionName}: Migrated ${documents.length} documents`);
        totalDocsMigrated += documents.length;
      }
    }

    console.log(
      `\n🎉 Migration completed! Total documents migrated: ${totalDocsMigrated}`
    );

    // Verify migration
    console.log("\n🔍 Verifying migration...");
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      if (collectionName.startsWith("system.")) continue;

      const localCount = await localConn.db
        .collection(collectionName)
        .countDocuments();
      const atlasCount = await atlasConn.db
        .collection(collectionName)
        .countDocuments();

      const status = localCount === atlasCount ? "✅" : "❌";
      console.log(
        `${status} ${collectionName}: Local=${localCount}, Atlas=${atlasCount}`
      );
    }

    // Close connections
    await localConn.close();
    await atlasConn.close();

    console.log("\n✨ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateData();
