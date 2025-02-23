import { Address, WeatherApiReturn } from "./interface";

const mocketResponse: WeatherApiReturn = {
  weatherData: {
    observationTime: new Date(),
    temperature: 0,
    weatherCode: 0,
    weatherIcons: [],
    weatherDescriptions: [],
    windSpeed: 0,
    windDegree: 0,
    windDir: "",
    pressure: 0,
    precip: 0,
    humidity: 0,
    cloudcover: 0,
    feelslike: 0,
    uvIndex: 0,
    visibility: 0,
  },
  localization: {
    latitude: 0,
    longitude: 0,
    isInUsa: true,
  },
};

const queryWeather = async (address: Address): Promise<WeatherApiReturn> => {
  console.log("Querying weather for address", address);
  return mocketResponse;
};

export default queryWeather;
