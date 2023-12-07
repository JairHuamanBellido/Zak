import { config } from "dotenv";
import { Db, MongoClient } from "mongodb";

config();
const uri = process.env.MONGODB_URI || "";

let cacheDb: Db | null = null;

export async function connectToDatabase() {
  if (cacheDb) {
    return cacheDb;
  }

  const client = await MongoClient.connect(uri);
  const db = await client.db("zak");

  cacheDb = db;
  return db;
}
