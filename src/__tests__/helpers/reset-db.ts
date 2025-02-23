import { prisma } from "./prisma";

export default async () => {
  await prisma.$transaction([
    prisma.weatherData.deleteMany(),
    prisma.coordinates.deleteMany(),
    prisma.property.deleteMany(),
  ]);
};
