# Weather API Wrapper Service

A high-performance caching REST API built with Node.js, TypeScript, Express, and Redis.
It fetches weather data dynamically from the Open-Meteo API
and caches results to optimize response times and bypass upstream limits.

## 🚀 Features

- **Geocoding & Forecast Integration**: Accepts city names directly.
- **Ultra-fast Caching**: Saves weather responses in Redis with a 12-hour expiration.
- **Rate Limiting**: Defends endpoints against excessive usage (60 requests per hour).
- **Global Error Handling**: Standardized JSON responses for all error types.

## 🛠️ Tech Stack

- **Runtime**: Node.js (v20+), TypeScript
- **Web Server**: Express
- **Cache**: Redis
- **Testing**: Vitest, Supertest

## 📦 Getting Started

1. **Prerequisites**: Ensure Redis is installed and running.

   ```bash
   # =============================================================
   # On Arch Linux:
   # 1. Install Redis
   sudo pacman -S redis
   # 2. Start the Redis service immediately
   sudo systemctl start redis
   # 3. Enable it to start automatically when your computer boots up
   sudo systemctl enable redis
   # 4. Status
   sudo systemctl status redis
   ```

2. **Setup**:

   ```bash
   npm install
   cp .env.example .env
   ```

3. **Development**:

   ```bash
   npm run dev
   ```

4. **Testing**:

   ```bash
   npm run test
   ```

## 🔌 API Usage

### Get Weather for a City

**Request**:

```bash
curl "http://localhost:3000/api/weather?city=london"
# Or in browser
http://localhost:3000/api/weather?city=london
```

**Response (`source: api`)**:

```json
{
  "city": "london",
  "temperature": 15.4,
  "conditions": "Code 3",
  "humidity": 68,
  "windSpeed": 11.2,
  "source": "api"
}
```

**Subsequent Request (`source: cache`)**:

```json
{
  "city": "london",
  "temperature": 15.4,
  "conditions": "Code 3",
  "humidity": 68,
  "windSpeed": 11.2,
  "source": "cache"
}
```

---

[Roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service)
