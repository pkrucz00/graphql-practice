import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "./db";

type BuilderSchema = {
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  PrismaTypes: PrismaTypes;
};

export const builder = new SchemaBuilder<BuilderSchema>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

// TODO add zip code regex validation
builder.addScalarType("Date", DateResolver, {});

builder.queryType({});
