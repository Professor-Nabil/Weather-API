# 🗺️ Project Overview & Architecture

Build a RESTful API that accepts a location (city or city code),
checks a local **Redis Cache** for recent weather data,
and falls back to a **3rd-Party Weather API** (e.g., Visual Crossing)
if the data is missing or expired.

## 📌 Architecture Flow

1. **Client Request**: `GET /api/weather?city=london`

2. **Cache Check**: Check Redis for key `weather:london`.
   - **HIT**: Return cached JSON response instantly.
   - **MISS**: Fetch data from the 3rd-party API.

3. **Save Cache**: Store the fresh response in Redis with a 12-hour expiration time (`EX 43200`).

4. **Response**: Return weather data to the client.
