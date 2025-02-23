import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { createYoga } from "graphql-yoga";
import { beforeEach } from "node:test";

import { schema } from "../../property/schema";
import resetDb from "./reset-db";

const yoga = createYoga({
  schema,
});

export const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});

beforeEach(async () => {
  await resetDb();
});
