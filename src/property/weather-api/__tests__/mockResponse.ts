import { WeatherApiReturn } from "../interface";
import { WeatherstackApiResponse } from "../sendRequest";

export const mockeedToday = new Date("2021-10-01T12:00:00Z");

export const mockedObservationTime = new Date("2021-10-01T10:00:00Z");

export const responseInUS: WeatherstackApiResponse = {
  current: {
    temperature: 72,
    observation_time: "10:00 AM",
    weather_code: 800,
    weather_icons: [
      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
    ],
    weather_descriptions: ["Sunny"],
    wind_speed: 5,
    wind_degree: 200,
    wind_dir: "S",
    pressure: 1000,
    precip: 0,
    humidity: 50,
    cloudcover: 0,
    feelslike: 70,
    uv_index: 5,
    visibility: 10,
  },
  location: {
    name: "Springfield",
    country: "United States",
    region: "Illinois",
    lat: "39.781721",
    lon: "-89.650148",
    timezone_id: "America/Chicago",
    localtime: "2021-10-01 12:00 PM",
    localtime_epoch: 1633097754,
    utc_offset: "-5.0",
  },
};

export const responseNotInUS: WeatherstackApiResponse = {
  current: { ...responseInUS.current },
  location: {
    name: "Toronto",
    country: "Canada",
    region: "Ontario",
    lat: "43.700111",
    lon: "-79.416298",
    timezone_id: "America/Toronto",
    localtime: "2021-10-01 12:00 PM",
    localtime_epoch: 1633097754,
    utc_offset: "-5.0",
  },
};

export const responseInUsMapped: WeatherApiReturn = {
  weatherData: {
    temperature: 72,
    observationTime: mockedObservationTime,
    weatherCode: 800,
    weatherIcons: [
      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
    ],
    weatherDescriptions: ["Sunny"],
    windSpeed: 5,
    windDegree: 200,
    windDir: "S",
    pressure: 1000,
    precip: 0,
    humidity: 50,
    cloudcover: 0,
    feelslike: 70,
    uvIndex: 5,
    visibility: 10,
  },
  localization: {
    latitude: 39.781721,
    longitude: -89.650148,
    isInUsa: true,
  },
};

export const responseNotInUsMapped: WeatherApiReturn = {
  ...responseInUsMapped,
  localization: {
    latitude: 43.700111,
    longitude: -79.416298,
    isInUsa: false,
  },
};
