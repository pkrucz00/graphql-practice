import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "./db";

export type BuilderSchema = {
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

builder.queryType({});
builder.mutationType({});

// TODO add zip code regex validation
builder.addScalarType("Date", DateResolver, {});
