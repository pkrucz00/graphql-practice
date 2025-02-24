import { Property } from "@prisma/client";

interface WeatherData {
  observationTime: Date;
  temperature: number;
  weatherCode: number;
  weatherIcons: string[];
  weatherDescriptions: string[];
  windSpeed: number;
  windDegree: number;
  windDir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uvIndex: number;
  visibility: number;
}

interface Localization {
  latitude: number;
  longitude: number;
  isInUsa: boolean;
}

export type WeatherApiReturn = {
  weatherData: WeatherData;
  localization: Localization;
};

export type Address = Pick<Property, "street" | "city" | "state" | "zip">;

export type QueryWeather = (_: Address) => Promise<WeatherApiReturn>;
