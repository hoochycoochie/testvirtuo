import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
export class Db {
  static async connect() {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
      useNewUrlParser: true,
    //  autoReconnect: true,
      useUnifiedTopology: true,
     // reconnectTries: Number.MAX_VALUE,
     // reconnectInterval: 1000,
    };

    await mongoose.connect(uri, mongooseOpts);
  }

  static async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }

  static async clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      // @ts-ignore
      await collection.deleteMany();
    }
  }
}
