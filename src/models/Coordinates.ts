import { builder } from '../builder';

builder.prismaObject('Coordinates', {
    fields: (t) => ({
        id: t.exposeID('id'),
        latitude: t.exposeFloat('latitude'),
        longitude: t.exposeFloat('longitude'),
        property: t.relation('property'),
    }),
});