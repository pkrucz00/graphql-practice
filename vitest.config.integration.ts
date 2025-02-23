import { loadEnvFile } from "process";
import { defineConfig } from "vitest/config";

loadEnvFile(".env.test");

export default defineConfig({
  test: {
    include: ["src/**/*.spec.ts"],
    poolOptions: {
      max: 1,
    },
    setupFiles: ["./src/__tests__/helpers/setup.ts"],
  },
});
