# TODO: Weather API Wrapper Service

## 🛠️ Implementation Phases

### 📦 Phase 1: Project Initialization & Hardcoded Response

Set up the base server and establish the project structure.
**Base Server & Environment Setup**

- [x] Initialize the project (`npm init -y` or language equivalent).
- [x] Install base dependencies (Express/Fastify, TypeScript/Python, `dotenv`).
- [x] Create `.env.example` with placeholders for `PORT`, `WEATHER_API_KEY`, and `REDIS_URL`.
- [x] Implement a test route `GET /api/weather` that returns a hardcoded mock weather response.
- [x] Handle 404 routes for non-existent endpoints.

---

### 🌐 Phase 2: 3rd-Party API Integration

Connect the server to the external weather data provider.
**Fetch Live Weather Data**

- [x] Install an HTTP client (e.g., `axios`, `node-fetch`, or native fetch).
- [x] Create a dedicated weather service module to handle external API requests.
- [x] Implement query parameter validation (ensure `?city=` or `?location=` is provided).
- [x] Dynamically call the Visual Crossing API (or chosen provider) using the city query.
- [x] Sanitize the 3rd-party API response to return only necessary data (e.g., temperature, conditions, humidity, wind speed).
- [x] Add error handling for invalid cities or API provider downtime.

---

### 🚀 Phase 3: Redis Caching Layer

Speed up your API and avoid hitting external rate limits by saving responses in Redis.
**Implement Redis Cache**

- [ ] Set up local Redis or connect to a cloud Redis instance.
- [ ] Install the Redis client package (e.g., `redis` for Node.js).
- [ ] Connect to Redis on server startup and log connection success/error.
- [ ] Update the weather controller to check Redis _before_ calling the external API.
- [ ] If data exists in Redis (Cache Hit), parse it and return it immediately to the client.
- [ ] If data is missing (Cache Miss), fetch it from the API and save the result to Redis using a key like `weather:<city_name>`.
- [ ] Set a 12-hour (43,200 seconds) expiration (`EX`) on all cached Redis keys.

---

### 🛑 Phase 4: Rate Limiting & Middleware

Secure the API against abuse.
**Add Rate Limiting & Security**

- [ ] Install rate-limiting middleware (e.g., `express-rate-limit`).
- [ ] Define rate limits (e.g., max 60 requests per hour per IP).
- [ ] Return a standard `429 Too Many Requests` status code when the limit is exceeded.
- [ ] Ensure the rate-limiter returns clear, informative headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`).
- [ ] Test the rate limiter manually or via tests to confirm it blocks excessive traffic.

---

### 🧹 Phase 5: Production Readiness & Final Polish

Prepare the application for real-world deployment.
**Final Polish**

- [ ] Update `.env.example` to ensure it contains all keys used in the project.
- [ ] Clean up any temporary debugging `console.log` statements.
- [ ] Add comprehensive error middleware to catch unexpected crashes.
- [ ] Create a comprehensive `README.md` with API usage instructions, setup steps, and sample curl requests.
