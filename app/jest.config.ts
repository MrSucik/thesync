import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  modulePaths: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/utils/setupTests.ts"],
};

export default config;
