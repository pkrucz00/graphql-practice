import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Property", {
  fields: (t) => ({
    id: t.exposeID("id"),
    street: t.exposeString("street"),
    city: t.exposeString("city"),
    state: t.exposeString("state"),
    zip: t.exposeString("zip"),
    weatherData: t.relation("weatherData"),
    coordinates: t.relation("coordinates"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});

builder.queryField("properties", (t) =>
  t.prismaField({
    type: ["Property"],
    resolve: async (
      queryFromInfo,
      _rootCertificates,
      _argsToArgsConfig,
      _contextCacheSymbol,
      _info,
    ) => {
      return prisma.property.findMany({ ...queryFromInfo });
    },
  }),
);
