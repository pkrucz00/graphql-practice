import { describe } from "node:test";
import { prisma } from "../../../../__mocks__/db";
import { expect, it, vi } from "vitest";
import { Property } from "@prisma/client";
import { getProperty } from "../property";

vi.mock("../../../../db");

describe("getProperty", () => {
  it("returns property if it exists", async () => {
    const id = 1;

    prisma.property.findUnique.mockResolvedValue({
      id: 1,
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
      createdAt: new Date("2021-09-01T12:00:00Z"),
    } as unknown as Property);

    const result = await getProperty(id);

    expect(result).toEqual({
      id: 1,
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
      createdAt: new Date("2021-09-01T12:00:00Z"),
    });
  });

  it("returns null if property does not exist", async () => {
    const id = 1;

    prisma.property.findUnique.mockResolvedValue(null);

    const result = await getProperty(id);

    expect(result).toEqual(null);
  });
});
