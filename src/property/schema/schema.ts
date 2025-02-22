import { builder } from "../../builder";

import "./models/Property";
import "./models/WeatherData";
import "./models/Coordinates";

import "./queries/properties";

export const schema = builder.toSchema();
