import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.spec.ts"],
    poolOptions: {
      max: 1,
    },
  },
});
