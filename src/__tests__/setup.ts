import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { createYoga } from "graphql-yoga";

import { schema } from "../property/schema";

const yoga = createYoga({
  schema,
});

export const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});
