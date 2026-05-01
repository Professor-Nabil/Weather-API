import { Request, Response } from "express";
import { fetchLiveWeather } from "../services/weatherService.js";
import { getCachedData, setCachedData } from "../services/cacheService.js";
import { WeatherResponse } from "../types/index.js";

export const getWeatherData = async (req: Request, res: Response) => {
  const location = req.query.city || req.query.location;

  if (!location || typeof location !== "string" || location.trim() === "") {
    return res.status(400).json({
      error: "Validation Error",
      message:
        "Query parameter 'city' or 'location' is required and cannot be empty.",
    });
  }

  const cleanLocation = location.trim().toLowerCase();
  const cacheKey = `weather:${cleanLocation}`;

  try {
    // 1. Check Redis Cache first (Cache Look-up)
    const cachedWeather = await getCachedData<WeatherResponse>(cacheKey);

    if (cachedWeather) {
      // Return cached response immediately with "cache" source tag
      return res.status(200).json({
        ...cachedWeather,
        source: "cache",
      });
    }

    // 2. Cache Miss: Call the weather service for real-time data
    const freshWeather = await fetchLiveWeather(cleanLocation);

    // 3. Save the fresh data to Redis with a 12-hour expiry
    await setCachedData(cacheKey, freshWeather);

    return res.status(200).json(freshWeather);
  } catch (error: any) {
    console.error("Weather Controller Error:", error.message || error);

    const statusCode = error.status || 500;
    const message = error.message || "Failed to retrieve live weather data.";

    return res.status(statusCode).json({
      error: statusCode === 400 ? "Invalid Location" : "Internal Server Error",
      message,
    });
  }
};
