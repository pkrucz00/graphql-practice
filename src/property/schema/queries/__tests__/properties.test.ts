import { expect, test, vi } from "vitest";
import { getProperties } from "../properties";
import { prisma } from "../../../../__mocks__/db";

vi.mock("../../../../db");

test("getProperties", async () => {
  prisma.property.findMany.mockResolvedValue([]);

  const result = await getProperties();
  expect(result).toEqual([]);
  expect(prisma.property.findMany).toHaveBeenCalled();
});
