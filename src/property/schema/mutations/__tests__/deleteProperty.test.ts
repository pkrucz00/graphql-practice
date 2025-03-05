import { describe, expect, it, vi } from "vitest";
import { propertyResponse } from "./mockData";
import { prisma } from "../../../../__mocks__/db";
import { deleteProperty } from "../deleteProperty";

vi.mock("../../../../db");

describe("deleteProperty", () => {
  const dummyQuery = {
    include: {
      weatherData: true,
      coordinates: true,
    },
    select: {
      id: true,
      street: true,
      city: true,
      state: true,
      zip: true,
    },
  };
  it("should delete a property if it exists in the database", async () => {
    // given
    const propertyId = 1;
    const property = propertyResponse;

    prisma.property.delete.mockResolvedValue(property);

    // when
    const result = await deleteProperty(propertyId, dummyQuery);

    // then
    expect(result).toEqual(property);
    expect(prisma.property.delete).toHaveBeenCalledWith({
      where: { id: propertyId },
      ...dummyQuery,
    });
  });

  it("should return null if the property does not exist in the database", async () => {
    // given
    const propertyId = 1;

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    prisma.property.delete.mockRejectedValue(new Error("Property not found"));

    // when
    const result = await deleteProperty(propertyId, dummyQuery);

    // then
    expect(result).toBeNull();
    expect(prisma.property.delete).toHaveBeenCalledWith({
      where: { id: propertyId },
      ...dummyQuery,
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
