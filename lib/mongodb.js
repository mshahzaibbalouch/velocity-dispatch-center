import { MongoClient } from 'mongodb';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL is not defined in .env');
}

let client;
let db;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(MONGODB_URL, {
      maxPoolSize: 10,
      minPoolSize: 5,
    });

    await client.connect();
    db = client.db('velocity_dispatch');

    console.log('✓ Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error.message);
    throw error;
  }
}

export async function getDatabase() {
  if (!db) {
    const { db: database } = await connectToDatabase();
    db = database;
  }
  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('✓ Disconnected from MongoDB');
  }
}
