import { builder } from "../../../builder";
import { prisma } from "../../../db";

builder.queryField("properties", (t) =>
  t.prismaField({
    type: ["Property"],
    resolve: getProperties,
  }),
);

export const getProperties = async () => {
  return prisma.property.findMany();
};
