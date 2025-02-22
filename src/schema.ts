import { builder } from './builder';

import "./models/Property";
import "./models/WeatherData";
import "./models/Coordinates";

export const schema = builder.toSchema();