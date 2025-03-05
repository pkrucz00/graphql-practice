import { Prisma, Property } from "@prisma/client";
import { builder } from "../../../builder";
import { prisma } from "../../../db";

builder.mutationField("deleteProperty", (t) =>
  t.prismaField({
    type: "Property",
    args: {
      id: t.arg.int({ required: true }),
    },
    nullable: true,
    resolve: async (query, _root, args) => {
      return await deleteProperty(args.id, query);
    },
  }),
);

export const deleteProperty = async (
  id: number,
  query: { include?: Prisma.PropertyInclude; select?: Prisma.PropertySelect },
): Promise<Property | null> => {
  return await prisma.property
    .delete({
      where: { id },
      ...query,
    })
    .catch((error) => {
      console.error("Error deleting property:", error);
      return null;
    });
};
