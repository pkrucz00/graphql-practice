import { describe } from "node:test";
import { expect, test } from "vitest";
import { executor } from "./setup";
import { parse } from "graphql";

describe("properties", () => {
  test("getProperties", async () => {
    const query = parse(`
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
    const result = await executor({ document: query });
    expect(result).toMatchSnapshot();
  });
});
