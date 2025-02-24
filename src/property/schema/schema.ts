import { builder } from "../../builder";

import "./models/Property";
import "./models/WeatherData";
import "./models/Coordinates";

import "./queries/properties";
import "./queries/property";

import "./mutations/createProperty";
import "./mutations/deleteProperty";

export const schema = builder.toSchema();
