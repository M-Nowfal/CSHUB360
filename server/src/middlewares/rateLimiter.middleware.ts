import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient, RedisClientType } from "redis";
import { REDIS_CONFIG } from "../utils/constants";
import logger from "../utils/logger";

const redisClient: RedisClientType = createClient({
  url: REDIS_CONFIG.REDIS_URL
});

redisClient.connect()
  .then(() => logger.info("Redis connected!"))
  .catch((err) => logger.error("Redis connection failed:", err));

const apiLimiter: RateLimitRequestHandler = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
  windowMs: 15 * 1000, // 10 req per 15 seconds 
  max: 10,
  message: { message: "Too many requests! wait few seconds before try again." },
});

export default apiLimiter;
