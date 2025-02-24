import { Property } from "@prisma/client";
import * as weatherAPI from "../../../weather-api";

export const propertyResponse = {
  id: 1,
  street: "123 Main St",
  city: "Springfield",
  state: "IL",
  zip: "62701",
  weatherData: {
    temperature: 75,
    windSpeed: 5,
    weatherCode: 800,
  },
  coordinates: {
    latitude: 39.781721,
    longitude: -89.650148,
  },
  createdAt: new Date("2021-09-01T12:00:00Z"),
} as unknown as Property;

export const weatherApiResponse = {
  localization: {
    isInUsa: true,
    latitude: 39.781721,
    longitude: -89.650148,
  },
  weatherData: {
    temperature: 75,
    windSpeed: 5,
    weatherCode: 800,
  },
} as unknown as weatherAPI.WeatherApiReturn;
