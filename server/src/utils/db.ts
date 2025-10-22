import mongoose from "mongoose";
import mongooseSanitize from "mongoose-sanitize";
import { DB_CONFIG } from "./constants";
import logger from "./logger";

mongoose.plugin(mongooseSanitize);

// Serverless connection caching
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const cached = globalWithMongoose.mongoose || { conn: null, promise: null };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = cached;
}

const connectToDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    if (mongoose.connection.readyState === 1) {
      logger.debug("Using cached database connection");
      return cached.conn;
    }
    // Connection is dead, reset cache
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts = {
      dbName: DB_CONFIG.DB_NAME as string,
      bufferCommands: false, // Crucial for serverless
      maxPoolSize: 5, // Reduced for serverless
      minPoolSize: 1,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxIdleTimeMS: 30000,
    };

    logger.info("Creating new database connection...");
    cached.promise = mongoose.connect(DB_CONFIG.CONNECTION_URI as string, opts)
      .then((mongooseInstance) => {
        logger.info("Database connected successfully");
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        logger.error("Database connection failed:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectToDB;
