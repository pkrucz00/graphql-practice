import { Property } from "@prisma/client";
import { builder } from "../../../builder";
import { prisma } from "../../../db";

const sortOrderValues = ["asc", "desc"] as const;
type SortOrder = (typeof sortOrderValues)[number];

const sortOrder = builder.enumType("SortOrder", {
  values: sortOrderValues,
});

type GetPropertiesArgs = {
  sortByCreationDate?: SortOrder | null;
  filterBy?: {
    city?: string | null;
    state?: string | null;
    zip?: string | null;
  };
};

builder.queryField("properties", (t) =>
  t.prismaField({
    type: ["Property"],
    args: {
      sortByCreationDate: t.arg({ type: sortOrder }),
      city: t.arg({ type: "String" }),
      state: t.arg({ type: "String" }),
      zip: t.arg({ type: "String" }),
    },
    resolve: async (_query, _root, args) =>
      getProperties({
        sortByCreationDate: args.sortByCreationDate,
        filterBy: {
          city: args.city,
          state: args.state,
          zip: args.zip,
        },
      }),
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

export const getProperties = async ({
  sortByCreationDate,
  filterBy,
}: GetPropertiesArgs) => {
  const shouldSort =
    sortByCreationDate === "asc" || sortByCreationDate === "desc";

  const filterQuery = {
    city: filterBy?.city || undefined,
    state: filterBy?.state || undefined,
    zip: filterBy?.zip || undefined,
  };

  const filteredProperties = await prisma.property.findMany({
    where: filterQuery,
  });

  return shouldSort
    ? sortProperties(filteredProperties, sortByCreationDate!)
    : filteredProperties;
};
