import axios from "axios";
import { WeatherResponse } from "../types/index.js";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchLiveWeather = async (
  city: string,
): Promise<WeatherResponse> => {
  try {
    // 1. Convert City Name to Coordinates (Geocoding)
    const geoResponse = await axios.get(GEOCODING_URL, {
      params: {
        name: city,
        count: 1,
        language: "en",
        format: "json",
      },
    });

    const geoData = geoResponse.data;
    if (!geoData.results || geoData.results.length === 0) {
      const err: any = new Error(`City '${city}' not found.`);
      err.status = 400;
      throw err;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // 2. Fetch live weather using coordinates
    const weatherResponse = await axios.get(WEATHER_URL, {
      params: {
        latitude,
        longitude,
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        forecast_days: 1,
      },
    });

    const current = weatherResponse.data.current;

    // 3. Transform Open-Meteo response into our standard format
    return {
      city: name.toLowerCase(),
      temperature: current.temperature_2m,
      conditions: `Code ${current.weather_code}`, // Open-Meteo returns a standard WMO weather code
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      source: "api",
    };
  } catch (error: any) {
    if (error.status) throw error;
    throw new Error("Failed to communicate with Open-Meteo weather service.");
  }
};
