import { describe } from "node:test";
import { expect, test } from "vitest";
import { executor } from "./helpers/setup";
import { parse } from "graphql";
import createTestProperties from "./helpers/createTestProperties";

const propertiesQuery = parse(`
  query {
    properties {
      street
      city
      zip
      state
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
}
`);

describe("properties", () => {
  test("Get empty list when the database is empty", async () => {
    const result = await executor({ document: propertiesQuery });
    expect(result).toEqual({
      data: {
        properties: [],
      },
    });
  });

  test("Get a list of properties", async () => {
    await createTestProperties();

    const result = await executor({ document: propertiesQuery });
    expect(result).toEqual({
      data: {
        properties: [
          {
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zip: "62701",
            weatherData: {
              temperature: 70,
              windSpeed: 5,
              weatherCode: 800,
            },
            coordinates: {
              latitude: 39.781721,
              longitude: -89.650148,
            },
          },
          {
            street: "321 Side St",
            city: "Dusty",
            state: "CT",
            zip: "21378",
            weatherData: {
              temperature: 70,
              windSpeed: 5,
              weatherCode: 800,
            },
            coordinates: {
              latitude: 31.781721,
              longitude: -83.650148,
            },
          },
          {
            street: "213 Diamond St",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            weatherData: {
              temperature: 75,
              windSpeed: 5,
              weatherCode: 840,
            },
            coordinates: {
              latitude: 37.7749,
              longitude: -122.4194,
            },
          },
        ],
      },
    });
  });

  test("Sort a list of properties by createion date", async () => {
    const queryWithSort = parse(`
      query($sortByCreationDate: SortOrder) {
        properties(sortByCreationDate: $sortByCreationDate) {
          street
          createdAt
        }
      }
    `);

    await createTestProperties();

    const result = await executor({
      document: queryWithSort,
      variables: {
        sortByCreationDate: "asc",
      },
    });

    expect(result).toEqual({
      data: {
        properties: [
          {
            street: "123 Main St",
            createdAt: "2021-09-01",
          },
          {
            street: "213 Diamond St",
            createdAt: "2022-01-01",
          },
          {
            street: "321 Side St",
            createdAt: "2022-03-01",
          },
        ],
      },
    });
  });
});
