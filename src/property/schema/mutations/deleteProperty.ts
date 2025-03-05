import { Property } from "@prisma/client";
import { builder } from "../../../builder";
import { prisma } from "../../../db";

builder.mutationField("deleteProperty", (t) =>
  t.prismaField({
    type: "Property",
    args: {
      id: t.arg.int({ required: true }),
    },
    nullable: true,
    resolve: async (_query, _root, args) => {
      return await deleteProperty(args.id);
    },
  }),
);

export const deleteProperty = async (id: number): Promise<Property | null> => {
  const property = await prisma.property.findUnique({
    where: { id },
  });
  if (!property) {
    console.error("Property not found");
    return null;
  }

  console.log("Deleting property with id", id);
  await prisma.property
    .delete({
      where: { id },
    })
    .catch((error) => {
      console.error("Error when deleting a property", error);
      return null;
    });

  return property;
};
