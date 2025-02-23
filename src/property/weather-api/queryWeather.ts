import { Address, WeatherApiReturn } from "./interface";
import sendRequest, { WeatherstackApiResponse } from "./sendRequest";

const mapTime = (timeString: string): Date => {
  const today = new Date();

  const [time, modifier] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  const isPm = modifier === "PM";
  const isMidnight = hours === 12;
  const isNoon = hours === 12 && !isPm;

  const hours24h = isPm && !isMidnight ? hours + 12 : isNoon ? 0 : hours;

  today.setHours(hours24h);
  today.setMinutes(minutes);
  today.setSeconds(0);

  return today;
};

const mapWeatherstackResponse = (
  response: WeatherstackApiResponse,
): WeatherApiReturn => {
  const current = response.current;
  const location = response.location;

  return {
    weatherData: {
      observationTime: mapTime(current.observation_time),
      temperature: current.temperature,
      weatherCode: current.weather_code,
      weatherIcons: current.weather_icons,
      weatherDescriptions: current.weather_descriptions,
      windSpeed: current.wind_speed,
      windDegree: current.wind_degree,
      windDir: current.wind_dir,
      pressure: current.pressure,
      precip: current.precip,
      humidity: current.humidity,
      cloudcover: current.cloudcover,
      feelslike: current.feelslike,
      uvIndex: current.uv_index,
      visibility: current.visibility,
    },
    localization: {
      latitude: Number(location.lat),
      longitude: Number(location.lon),
      isInUsa: location.country.includes("United States"),
    },
  };
};

const queryWeather = async ({
  city,
  state,
  zip,
  street,
}: Address): Promise<WeatherApiReturn> => {
  const formatQuery = `${street}, ${city}, ${state}, ${zip}`;
  console.log(`Querying weather for ${formatQuery}`);

  const weatherApiResponse: WeatherstackApiResponse =
    await sendRequest(formatQuery);

  return mapWeatherstackResponse(weatherApiResponse);
};

export default queryWeather;
