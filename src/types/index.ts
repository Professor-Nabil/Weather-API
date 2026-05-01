export interface WeatherResponse {
  city: string;
  temperature: number;
  conditions: string;
  humidity: number;
  windSpeed: number;
  source: "cache" | "api" | "mock";
}
