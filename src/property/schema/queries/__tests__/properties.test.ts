import { expect, describe, vi, it } from "vitest";
import { getProperties } from "../properties";
import { prisma } from "../../../../__mocks__/db";
import { Property } from "@prisma/client";

vi.mock("../../../../db");

const properties: Property[] = [
  {
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
  },
  {
    street: "321 Side St",
    city: "Dusty",
    state: "CA",
    zip: "21378",
    weatherData: {
      temperature: 65,
      windSpeed: 2,
      weatherCode: 830,
    },
    coordinates: {
      latitude: 39.7812321,
      longitude: -89.652148,
    },
    createdAt: new Date("2022-03-01T12:00:00Z"),
  },
  {
    street: "321 Side St",
    city: "Hazy",
    state: "CA",
    zip: "12345",
    weatherData: {
      temperature: 70,
      windSpeed: 5,
      weatherCode: 840,
    },
    coordinates: {
      latitude: 40.781721,
      longitude: -15.650148,
    },
    createdAt: new Date("2022-01-01T12:00:00Z"),
  },
] as unknown as Property[];

describe("getProperties", () => {
  it("should get an empty list if no properties are sourced", async () => {
    prisma.property.findMany.mockResolvedValue([]);

    const result = await getProperties({});
    expect(result).toEqual([]);
    expect(prisma.property.findMany).toHaveBeenCalled();
  });

  it("should get a list of properties", async () => {
    prisma.property.findMany.mockResolvedValue([...properties]);

    const result = await getProperties({});
    expect(result).toEqual(properties);
    expect(prisma.property.findMany).toHaveBeenCalled();
  });

  it("should sort properties by creation date in ascending order", async () => {
    prisma.property.findMany.mockResolvedValue([...properties]);
    const expectedResults = [properties[0], properties[2], properties[1]];

    const result = await getProperties({ sortByCreationDate: "asc" });
    expect(result).toEqual(expectedResults);
    expect(prisma.property.findMany).toHaveBeenCalled();
  });

  it("should sort properties by creation date in descending order", async () => {
    prisma.property.findMany.mockResolvedValue([...properties]);
    const expectedResults = [properties[1], properties[2], properties[0]];

    const result = await getProperties({ sortByCreationDate: "desc" });
    expect(result).toEqual(expectedResults);
    expect(prisma.property.findMany).toHaveBeenCalled();
  });

  it("should filter properties by city", async () => {
    const city = "Dusty";
    const expectedResults = [properties[1]];
    prisma.property.findMany.mockResolvedValue(expectedResults);

    const result = await getProperties({ filterBy: { city } });
    expect(result).toEqual(expectedResults);
    expect(prisma.property.findMany).toHaveBeenCalledWith({
      where: { city },
    });
  });

  it("should filter properties by state", async () => {
    const state = "IL";
    const expectedResults = [properties[0]];
    prisma.property.findMany.mockResolvedValue(expectedResults);

    const result = await getProperties({ filterBy: { state } });
    expect(result).toEqual(expectedResults);
    expect(prisma.property.findMany).toHaveBeenCalledWith({
      where: { state },
    });
  });

  it("should filter properties by zip", async () => {
    const zip = "12345";
    const expectedResults = [properties[2]];
    prisma.property.findMany.mockResolvedValue(expectedResults);

    const result = await getProperties({ filterBy: { zip } });
    expect(result).toEqual(expectedResults);
    expect(prisma.property.findMany).toHaveBeenCalledWith({
      where: { zip },
    });
  });
});
