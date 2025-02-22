import SchemaBuilder from "@pothos/core";
import { DateResolver } from 'graphql-scalars';

type BuilderSchema = {
    Scalars: {
        Date: {
            Input: Date;
            Output: Date
        }
    }
};

export const builder = new SchemaBuilder<BuilderSchema>({});

builder.addScalarType('Date', DateResolver, {});