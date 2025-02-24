import { Property } from "@prisma/client";
import { prisma } from "./prisma";

const createTestProperties = async (): Promise<Property[]> => {
  await prisma.property.create({
    data: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      weatherData: {
        create: {
          observationTime: "2021-09-01T12:00:00Z",
          temperature: 70,
          weatherCode: 800,
          weatherDescriptions: ["Clear sky"],
          windSpeed: 5,
          windDegree: 180,
          windDir: "S",
          pressure: 1012,
          precip: 0,
          humidity: 50,
          cloudcover: 0,
          feelslike: 70,
          uvIndex: 5,
          visibility: 10,
        },
      },
      coordinates: {
        create: {
          latitude: 39.781721,
          longitude: -89.650148,
        },
      },
      createdAt: "2021-09-01T12:00:00Z",
    },
  });
  await prisma.property.create({
    data: {
      street: "321 Side St",
      city: "Dusty",
      state: "CA",
      zip: "21378",
      weatherData: {
        create: {
          observationTime: "2022-03-01T12:00:00Z",
          temperature: 70,
          weatherCode: 800,
          weatherDescriptions: ["Cloudy"],
          windSpeed: 5,
          windDegree: 180,
          windDir: "N",
          pressure: 1022,
          precip: 4,
          humidity: 50,
          cloudcover: 0,
          feelslike: 70,
          uvIndex: 5,
          visibility: 10,
        },
      },
      coordinates: {
        create: {
          latitude: 31.781721,
          longitude: -83.650148,
        },
      },
      createdAt: "2022-03-01T12:00:00Z",
    },
  });

  await prisma.property.create({
    data: {
      street: "213 Diamond St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      weatherData: {
        create: {
          observationTime: "2022-01-01T12:00:00Z",
          temperature: 75,
          weatherCode: 840,
          weatherDescriptions: ["Rainy"],
          windSpeed: 5,
          windDegree: 180,
          windDir: "NE",
          pressure: 999,
          precip: 1,
          humidity: 50,
          cloudcover: 0,
          feelslike: 70,
          uvIndex: 5,
          visibility: 10,
        },
      },
      coordinates: {
        create: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      },
      createdAt: "2022-01-01T12:00:00Z",
    },
  });

  // assuming that database was empty before this function was called
  return await prisma.property.findMany();
};

export default createTestProperties;
