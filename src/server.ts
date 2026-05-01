import app from "./app.js";
import { connectRedis } from "./services/cacheService.js";

const PORT = process.env.PORT || 3000;

// Connect to Redis first, then start the server
connectRedis()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🟢 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to initialize Redis cache:", err);
    process.exit(1);
  });
