import { describe, expect, it, vi, vitest } from "vitest";
import { executor } from "./helpers/setup";

import * as weatherAPI from "../property/weather-api";
import { parse } from "graphql";
import { Property } from "@prisma/client";

vi.mock("../../../weather-api");

type ResponseData = {
  data: {
    createProperty: Property | null;
  };
};

describe("createProperty", () => {
  it("should create a property", async () => {
    // given
    const mutation = parse(`mutation createProperty($property: PropertyInput!) {
            createProperty(property: $property) {
                id
                street
                city
                state
                zip
                weatherData {
                    temperature
                    windSpeed
                    weatherCode
                }
                coordinates {
                    latitude
                    longitude
                }
            }
        }   `);
    const variables = {
      property: {
        city: "Springfield",
        state: "IL",
        zip: "62701",
        street: "123 Main St",
      },
    };

    /* Although we shouldn't use mocks in integratino tests, here I want to make an exception
        The API call can only be called 100 times a month, so I want to avoid calling it in tests */
    const weatherAPIResponse: weatherAPI.WeatherApiReturn = {
      localization: {
        isInUsa: true,
        latitude: 39.781721,
        longitude: -89.650148,
      },
      weatherData: {
        observationTime: new Date("2021-09-01T12:00:00Z"),
        temperature: 75,
        windSpeed: 5,
        weatherCode: 800,
        windDegree: 180,
        windDir: "S",
        pressure: 1012,
        precip: 0,
        humidity: 50,
        cloudcover: 0,
        feelslike: 70,
        uvIndex: 5,
        visibility: 10,
        weatherDescriptions: ["Clear sky"],
        weatherIcons: [
          "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
        ],
      },
    };

    const weatherApiSpy = vitest.spyOn(weatherAPI, "queryWeather");
    weatherApiSpy.mockResolvedValue(weatherAPIResponse);

    // when
    const result = (await executor<ResponseData>({
      document: mutation,
      variables,
    })) as unknown as ResponseData;

    const id = result.data ? result.data.createProperty?.id : -1;

    // then
    expect(result).toEqual({
      data: {
        createProperty: {
          id,
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
        },
      },
    });
    expect(weatherApiSpy).toHaveBeenCalledWith({
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    });
  });

  it("should return null if weather API fails", async () => {
    // given
    const mutation = parse(`mutation createProperty($property: PropertyInput!) {
            createProperty(property: $property) {
                id
            }
        }`);
    const variables = {
      property: {
        city: "Springfield",
        state: "IL",
        zip: "62701",
        street: "123 Main St",
      },
    };

    const weatherApiSpy = vitest.spyOn(weatherAPI, "queryWeather");
    weatherApiSpy.mockRejectedValue(new Error("Weather API failed"));

    const consoleErrorSpy = vitest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});

    // when
    const result = await executor({
      document: mutation,
      variables,
    });

    // then
    expect(result).toEqual({
      data: {
        createProperty: null,
      },
    });
    expect(weatherApiSpy).toHaveBeenCalledWith({
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
