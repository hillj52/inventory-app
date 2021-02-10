import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;
let db: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'mockJwtKey';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (collection) => {
    await collection.deleteMany({});
  });

  db = await mongoose.connection.db;
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

export { db };
