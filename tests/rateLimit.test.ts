import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { redisClient, connectRedis } from "../src/services/cacheService.js";

describe("Rate Limiting", () => {
  // Connect to Redis before any tests run
  beforeAll(async () => {
    await connectRedis();
  });

  // Disconnect from Redis after all tests are done so the test process exits cleanly
  afterAll(async () => {
    if (redisClient.isOpen) {
      await redisClient.quit();
    }
  });

  it("should enforce rate limits after 60 requests", async () => {
    // Send 60 requests to hit the exact limit
    for (let i = 0; i < 60; i++) {
      const res = await request(app).get("/api/weather?city=london");
      // Node's HTTP module converts incoming headers to lowercase
      expect(res.headers).toHaveProperty("ratelimit");
    }

    // The 61st request should be blocked instantly
    const blockedRes = await request(app).get("/api/weather?city=london");
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.body.error).toBe("Too Many Requests");
  }, 10000); // Give it a 10s timeout just in case local execution takes a moment
});
