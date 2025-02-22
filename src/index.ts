import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./property/schema/schema";

const url = process.env.SERVER_URL || "http://localhost";
const port = Number(process.env.PORT) || 4000;
const yoga = createYoga({
  schema,
});

const server = createServer(yoga);

server.listen(port, () => {
  console.log(`Server is running on ${url}:${port} 🚀`);
});
