import { rateLimit } from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 60, // Limit each IP to 60 requests per windowMs
  standardHeaders: "draft-7", // Returns clear headers: `RateLimit-Limit`, `RateLimit-Remaining`
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  statusCode: 429, // Return standard 429 status
  message: {
    error: "Too Many Requests",
    message: "Rate limit exceeded. You can only make 60 requests per hour.",
  },
});
