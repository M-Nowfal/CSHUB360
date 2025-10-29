import dotenv from "dotenv";
dotenv.config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT!,
  VERSION: process.env.VERSION!,
  NODE_ENV: process.env.NODE_ENV!
};

export const JWT_CONFIG = {
  ACCESS_TOKEN: {
    SECRET: process.env.JWT_ACCESS_SECRET!,
    EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    COOKIE_NAME: "cshub360_access",
    COOKIE_MAX_AGE: 15 * 60 // 15 minutes in seconds
  },
  REFRESH_TOKEN: {
    SECRET: process.env.JWT_REFRESH_SECRET!,
    EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    COOKIE_NAME: "cshub360_refresh",
    COOKIE_MAX_AGE: 7 * 24 * 60 * 60 // 7 days in seconds
  }
};

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/"
};

export const APP_CONFIG = {
  NAME: "CSHUB360",
  COLLEGE_NAME: process.env.COLLEGE_NAME || "Your College",
  COLLEGE_CODE: process.env.COLLEGE_CODE || "YCN",
  JWT_ISSUER: "cshub360.edu",
  JWT_AUDIENCE: "cshub360-users"
};

export const CORS_OPTIONS = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: process.env.ALLOWED_METHODS?.split(",") || []
};

export const DB_CONFIG = {
  CONNECTION_URI: process.env.MONGO_URI!,
  DB_NAME: process.env.DB_NAME!,
  CONNECTION_TIMEOUT_MS: 5000,
  POOL_SIZE: 10,
  PAGE_LIMIT: 15,
  MAX_RESULTS: 100,
  DEFAULT_SORT: { createdAt: -1 },
  DEFAULT_PAGE: 1,
  MAX_RETRIES: 3,
  CACHE_TTL: 60
};

export const REDIS_CONFIG = {
  REDIS_URL: process.env.UPSTASH_REDIS_URL!,
  REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN!
};

export const BCRYPT_CONFIG = {
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS!)
};
