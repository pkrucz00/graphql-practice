import { builder } from "../../../builder";
import { prisma } from "../../../db";

builder.queryField("properties", (t) =>
  t.prismaField({
    type: ["Property"],
    resolve: queryProperties,
  }),
);

export const queryProperties = async () => {
  return prisma.property.findMany();
};
