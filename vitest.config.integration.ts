import { loadEnvFile } from "process";
import { defineConfig } from "vitest/config";

loadEnvFile(".env.test");

export default defineConfig({
  test: {
    include: ["src/**/*.spec.ts"],
    maxConcurrency: 1,
    pool: "threads",
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 1,
      },
    },
    setupFiles: ["./src/__tests__/helpers/setup.ts"],
  },
});
