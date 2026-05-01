import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Create the Redis client
export const redisClient = createClient({
  url: REDIS_URL,
});

// Log Redis connection events
redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));
redisClient.on("connect", () => console.log("🔄 Connecting to Redis..."));
redisClient.on("ready", () => console.log("🎯 Redis Client Ready"));

/**
 * Connect to the Redis instance
 */
export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

/**
 * Retrieve cached data by key
 */
export const getCachedData = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading key "${key}" from Redis:`, error);
    return null;
  }
};

/**
 * Save data to Redis with a 12-hour expiration (43,200 seconds)
 */
export const setCachedData = async (
  key: string,
  value: any,
  expirationInSeconds = 43200,
): Promise<void> => {
  try {
    const serializedData = JSON.stringify(value);
    await redisClient.set(key, serializedData, {
      EX: expirationInSeconds,
    });
  } catch (error) {
    console.error(`Error saving key "${key}" to Redis:`, error);
  }
};
