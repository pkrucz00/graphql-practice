import { describe, expect, it } from "vitest";
import { prisma } from "./helpers/prisma";
import { executor } from "./helpers/setup";
import { parse } from "graphql";

const propertyToAdd = {
  data: {
    street: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    weatherData: {
      create: {
        observationTime: "2021-09-01T12:00:00Z",
        temperature: 70,
        weatherCode: 800,
        weatherDescriptions: ["Clear sky"],
        windSpeed: 5,
        windDegree: 180,
        windDir: "S",
        pressure: 1012,
        precip: 0,
        humidity: 50,
        cloudcover: 0,
        feelslike: 70,
        uvIndex: 5,
        visibility: 10,
      },
    },
    coordinates: {
      create: {
        latitude: 39.781721,
        longitude: -89.650148,
      },
    },
    createdAt: "2021-09-01T12:00:00Z",
  },
};

describe("property", () => {
  it("returns property if it exists", async () => {
    const property = await prisma.property.create(propertyToAdd);

    const result = await executor({
      document: parse(`
                query getProperty($id: Int!) {
                    property(id: $id) {
                        street
                        city
                        state
                        zip
                        weatherData {
                            weatherDescriptions
                        }
                        coordinates {
                            latitude
                            longitude
                        }
                    }
                }
            `),
      variables: {
        id: property.id,
      },
    });
    expect(result).toEqual({
      data: {
        property: {
          street: "123 Main St",
          city: "Springfield",
          state: "IL",
          zip: "62701",
          weatherData: {
            weatherDescriptions: ["Clear sky"],
          },
          coordinates: {
            latitude: 39.781721,
            longitude: -89.650148,
          },
        },
      },
    });
  });

  it("returns null if property does not exist", async () => {
    const result = await executor({
      document: parse(`
                query getProperty($id: Int!) {
                    property(id: $id) {
                        street
                    }
                }
            `),
      variables: {
        id: 1,
      },
    });
    expect(result).toEqual({
      data: {
        property: null,
      },
    });
  });
});
