import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host} [DB: ${conn.connection.name}]`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${(error as Error).message}`);
    console.warn(`👉 Running in degraded/offline DB mode. Mock or in-memory responses may be used during development.`);
  }
};
