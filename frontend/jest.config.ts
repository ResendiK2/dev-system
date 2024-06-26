import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/utils/(.*)$": "<rootDir>/utils/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/api/(.*)$": "<rootDir>/api/$1",
  },
};

export default createJestConfig(config);
