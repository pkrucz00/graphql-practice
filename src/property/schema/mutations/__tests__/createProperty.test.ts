import { beforeEach, describe, expect, it, vi, vitest } from "vitest";
import { prisma } from "../../../../__mocks__/db";
import * as weatherAPI from "../../../weather-api";

import { createProperty } from "../createProperty";
import { propertyResponse, weatherApiResponse } from "./mockData";

vi.mock("../../../../db");
vi.mock("../../../weather-api");

describe("createProperty", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should create a property", async () => {
    // given
    const propertyInput = {
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    };

    const weatherApiSpy = vitest.spyOn(weatherAPI, "queryWeather");
    weatherApiSpy.mockResolvedValue(weatherApiResponse);

    prisma.property.create.mockResolvedValue(propertyResponse);

    // when
    const result = await createProperty(propertyInput);

    // then
    expect(result).toEqual(propertyResponse);

    expect(weatherApiSpy).toHaveBeenCalledWith({
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    });
    expect(prisma.property.create).toHaveBeenCalledWith({
      data: {
        city: "Springfield",
        state: "IL",
        zip: "62701",
        street: "123 Main St",
        weatherData: {
          create: {
            temperature: 75,
            windSpeed: 5,
            weatherCode: 800,
          },
        },
        coordinates: {
          create: {
            latitude: 39.781721,
            longitude: -89.650148,
          },
        },
      },
    });
  });

  it("should return null if the weather API returns an error", async () => {
    // given
    const propertyInput = {
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    };

    const weatherApiSpy = vitest.spyOn(weatherAPI, "queryWeather");
    weatherApiSpy.mockRejectedValue(new Error("Weather API error"));

    // when
    const result = await createProperty(propertyInput);

    // then
    expect(result).toBeNull();
    expect(weatherApiSpy).toHaveBeenCalledWith({
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    });
    expect(prisma.property.create).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

  it("should return null if the property is not in the USA", async () => {
    // given
    const propertyInput = {
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    };

    const weatherAPIResponse: weatherAPI.WeatherApiReturn = {
      localization: {
        isInUsa: false,
        latitude: 39.781721,
        longitude: -89.650148,
      },
      weatherData: {
        temperature: 75,
        windSpeed: 5,
        weatherCode: 800,
      },
    } as unknown as weatherAPI.WeatherApiReturn;

    const weatherApiSpy = vitest.spyOn(weatherAPI, "queryWeather");
    weatherApiSpy.mockResolvedValue(weatherAPIResponse);

    // when
    const result = await createProperty(propertyInput);

    // then
    expect(result).toBeNull();
    expect(weatherApiSpy).toHaveBeenCalledWith({
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    });
    expect(prisma.property.create).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

  it("should return null if the creation fails", async () => {
    // given
    const propertyInput = {
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    };

    const weatherAPIResponse: weatherAPI.WeatherApiReturn = {
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

    const weatherApiSpy = vitest.spyOn(weatherAPI, "queryWeather");
    weatherApiSpy.mockResolvedValue(weatherAPIResponse);

    prisma.property.create.mockRejectedValue(
      new Error("Failed to create property"),
    );

    // when
    const result = await createProperty(propertyInput);

    // then
    expect(result).toBeNull();
    expect(weatherApiSpy).toHaveBeenCalledWith({
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    });
    expect(prisma.property.create).toHaveBeenCalledWith({
      data: {
        city: "Springfield",
        state: "IL",
        zip: "62701",
        street: "123 Main St",
        weatherData: {
          create: {
            temperature: 75,
            windSpeed: 5,
            weatherCode: 800,
          },
        },
        coordinates: {
          create: {
            latitude: 39.781721,
            longitude: -89.650148,
          },
        },
      },
    });
    expect(console.error).toHaveBeenCalled();
  });
});
