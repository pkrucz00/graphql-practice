import { builder } from "../../../builder";
import type { Property } from "@prisma/client";
import { prisma } from "../../../db";

builder.queryField("property", (t) => {
  return t.prismaField({
    type: "Property",
    args: {
      id: t.arg.int({ required: true }),
    },
    nullable: true,
    resolve: async (_query, _root, args) => {
      if (!args.id) {
        return null;
      }

      return getProperty(args.id);
    },
  });
});

export const getProperty = async (id: number): Promise<Property | null> => {
  return await prisma.property.findUnique({
    where: { id },
  });
};
