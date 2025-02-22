import { builder } from "../../../builder";

builder.prismaObject("WeatherData", {
  fields: (t) => ({
    id: t.exposeID("id"),
    observationTime: t.expose("observationTime", {
      type: "Date",
    }),
    temperature: t.exposeFloat("temperature"),
    weatherCode: t.exposeInt("weatherCode"),
    weatherDescriptions: t.exposeStringList("weatherDescriptions"),
    windSpeed: t.exposeFloat("windSpeed"),
    windDegree: t.exposeInt("windDegree"),
    windDir: t.exposeString("windDir"),
    pressure: t.exposeInt("pressure"),
    precip: t.exposeFloat("precip"),
    humidity: t.exposeInt("humidity"),
    cloudcover: t.exposeInt("cloudcover"),
    feelslike: t.exposeFloat("feelslike"),
    uvIndex: t.exposeInt("uvIndex"),
    visibility: t.exposeInt("visibility"),
    property: t.relation("property"),
  }),
});
