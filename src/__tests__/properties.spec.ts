import { describe } from "node:test";
import { expect, test } from "vitest";
import { executor } from "./helpers/setup";
import { parse } from "graphql";

describe("properties", () => {
  const propertiesQuery = parse(`
    query {
      properties {
        id
        street
        city
        zip
        state
        weatherData {
          temperature
          windSpeed
        }
        coordinates {
          latitude
          longitude
        }
        createdAt
    }
  }
  `);

  test("Get empty list when the database is empty", async () => {
    const result = await executor({ document: propertiesQuery });
    expect(result).toEqual({
      data: {
        properties: [],
      },
    });
  });
});
