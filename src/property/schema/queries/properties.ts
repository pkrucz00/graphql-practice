import { Property } from "@prisma/client";
import { builder } from "../../../builder";
import { prisma } from "../../../db";

const sortOrderValues = ["asc", "desc"] as const;
type SortOrder = (typeof sortOrderValues)[number];

const sortOrder = builder.enumType("SortOrder", {
  values: sortOrderValues,
});

builder.queryField("properties", (t) =>
  t.prismaField({
    type: ["Property"],
    args: {
      sortByCreationDate: t.arg({ type: sortOrder }),
    },
    resolve: async (_query, _root, args) =>
      getProperties(args.sortByCreationDate),
  }),
);

const sortProperties = (
  properties: Property[],
  sortByCreationDate: SortOrder,
) => {
  const reverse = sortByCreationDate === "asc" ? 1 : -1;
  return properties.sort(
    (a, b) => reverse * (a.createdAt.getTime() - b.createdAt.getTime()),
  );
};

export const getProperties = async (sortByCreationDate?: SortOrder | null) => {
  const shouldSort =
    sortByCreationDate === "asc" || sortByCreationDate === "desc";
  const allProperties = await prisma.property.findMany();

  return shouldSort
    ? sortProperties(allProperties, sortByCreationDate!)
    : allProperties;
};
