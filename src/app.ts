import express from "express";
import "dotenv/config";
import weatherRoutes from "./routes/weatherRoutes.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";

const app = express();

app.use(express.json());

// Apply rate limiting to all /api routes
app.use("/api", apiRateLimiter);

// Mount the weather routes
app.use("/api", weatherRoutes);

// --- 404 Catch-all ---
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

export default app;
