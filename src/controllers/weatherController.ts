import { Request, Response } from "express";
import { WeatherResponse } from "../types/index.js";

export const getWeatherData = async (req: Request, res: Response) => {
  const { city } = req.query;

  if (!city || typeof city !== "string") {
    return res.status(400).json({
      error: "Validation Error",
      message: "Query parameter 'city' is required.",
    });
  }

  // Hardcoded mock response for Phase 1
  const mockWeather: WeatherResponse = {
    city: city.toLowerCase(),
    temperature: 22.5,
    conditions: "Partly Cloudy",
    humidity: 60,
    windSpeed: 12.4,
    source: "mock",
  };

  return res.status(200).json(mockWeather);
};
