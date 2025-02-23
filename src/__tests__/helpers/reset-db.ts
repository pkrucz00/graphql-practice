import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async () => {
  await prisma.$transaction([
    prisma.weatherData.deleteMany(),
    prisma.coordinates.deleteMany(),
    prisma.property.deleteMany(),
  ]);
};
