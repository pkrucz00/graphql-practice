import { PrismaClient } from "@prisma/client";
import { beforeEach } from "node:test";
import { mockDeep, mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(prismaMock);
});

const prismaMock = mockDeep<PrismaClient>();
export const prisma = prismaMock;
