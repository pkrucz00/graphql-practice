import { builder } from "../../../builder";

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
