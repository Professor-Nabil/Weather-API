import { Request, Response } from "express";
import { fetchLiveWeather } from "../services/weatherService.js";

export const getWeatherData = async (req: Request, res: Response) => {
  // Support both '?city=' and '?location=' query parameters
  const location = req.query.city || req.query.location;

  // 1. Query Parameter Validation
  if (!location || typeof location !== "string" || location.trim() === "") {
    return res.status(400).json({
      error: "Validation Error",
      message:
        "Query parameter 'city' or 'location' is required and cannot be empty.",
    });
  }

  try {
    // 2. Call the Weather Service dynamically
    const weatherData = await fetchLiveWeather(location.trim());

    // 3. Respond with live 3rd-party data
    return res.status(200).json(weatherData);
  } catch (error: any) {
    console.error("Weather Controller Error:", error.message || error);

    // If our service threw an error with a status code (e.g., city not found by Visual Crossing)
    const statusCode = error.status || 500;
    const message = error.message || "Failed to retrieve live weather data.";

    return res.status(statusCode).json({
      error: statusCode === 400 ? "Invalid Location" : "Internal Server Error",
      message,
    });
  }
};
