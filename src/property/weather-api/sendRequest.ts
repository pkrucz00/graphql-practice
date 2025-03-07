import axios from "axios";

// documentation: https://weatherstack.com/documentation
// we omit the "request" parameter as we do not use it
export type WeatherstackApiResponse = {
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string; // Format: "HH:MM AM/PM"
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
  };
};

const sendRequest = async (
  location: string,
): Promise<WeatherstackApiResponse> => {
  try {
    const url = `${process.env.WEATHER_API_URL}/current?access_key=${process.env.WEATHER_API_KEY}`;

    const response = await axios.get<WeatherstackApiResponse>(url, {
      params: {
        query: location,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error querying weather: ${error}`);
  }
};

export default sendRequest;
