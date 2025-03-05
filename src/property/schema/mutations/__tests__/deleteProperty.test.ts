import { describe, expect, it, vi } from "vitest";
import { propertyResponse } from "./mockData";
import { prisma } from "../../../../__mocks__/db";
import { deleteProperty } from "../deleteProperty";

vi.mock("../../../../db");

describe("deleteProperty", () => {
  it("should delete a property if it exists in the database", async () => {
    // given
    const propertyId = 1;
    const property = propertyResponse;

    prisma.property.findUnique.mockResolvedValue(property);
    prisma.property.delete.mockResolvedValue(property);

    // when
    const result = await deleteProperty(propertyId);

    // then
    expect(result).toEqual(property);
    expect(prisma.property.findUnique).toHaveBeenCalledWith({
      where: { id: propertyId },
    });
    expect(prisma.property.delete).toHaveBeenCalledWith({
      where: { id: propertyId },
    });
  });

  it("should return null if the property does not exist in the database", async () => {
    // given
    const propertyId = 1;

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    prisma.property.findUnique.mockResolvedValue(null);
    prisma.property.delete.mockRejectedValue(new Error("Property not found"));

    // when
    const result = await deleteProperty(propertyId);

    // then
    expect(result).toBeNull();
    expect(prisma.property.findUnique).toHaveBeenCalledWith({
      where: { id: propertyId },
    });
    expect(prisma.property.delete).not.toHaveBeenCalledWith({
      where: { id: propertyId },
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
