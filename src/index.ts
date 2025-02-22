import { createServer } from 'node:http';
import { createYoga, createSchema } from 'graphql-yoga';


const port = Number(process.env.PORT) || 4000;
const yoga = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
            type Query {
                hello: String!
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello World!',
            },
        },
    })
});

const server = createServer(yoga);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} 🚀`)
});