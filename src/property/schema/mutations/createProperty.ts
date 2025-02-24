import { builder } from "../../../builder";
import { prisma } from "../../../db";
import * as weatherAPI from "../../weather-api";

import type { Property } from "@prisma/client";

type PropertyInputFields = weatherAPI.Address;

const propertyInput = builder.inputType("PropertyInput", {
  fields: (t) => ({
    city: t.string({ required: true }),
    state: t.string({ required: true }),
    zip: t.string({ required: true }),
    street: t.string({ required: true }),
  }),
});

builder.mutationField("createProperty", (t) => {
  return t.prismaField({
    type: "Property",
    args: {
      property: t.arg({ type: propertyInput, required: true }),
    },
    nullable: true,
    resolve: async (_query, _root, args) => {
      return createProperty({
        city: args.property.city,
        state: args.property.state,
        zip: args.property.zip,
        street: args.property.street,
      });
    },
  });
});

const queryWeatherOrNull = async (property: PropertyInputFields) => {
  try {
    return await weatherAPI.queryWeather(property);
  } catch (error) {
    console.error("Error querying weather", error);
    return null;
  }
};

export const createProperty = async (
  property: PropertyInputFields,
): Promise<Property | null> => {
  const queriedWeather = await queryWeatherOrNull(property);
  if (!queriedWeather) {
    return null;
  }

  if (!queriedWeather.localization.isInUsa) {
    console.error("Property is not in the USA");
    return null;
  }

  const propertyData = {
    ...property,
    weatherData: {
      create: { ...queriedWeather.weatherData },
    },
    coordinates: {
      create: {
        latitude: queriedWeather.localization.latitude,
        longitude: queriedWeather.localization.longitude,
      },
    },
  };

  return await prisma.property
    .create({
      data: propertyData,
    })
    .catch((error) => {
      console.error("Error creating property", error);
      return null;
    });
};
