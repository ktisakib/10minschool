/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const customConfig: Config = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^__mocks__/(.*)$": "<rootDir>/../../__mocks__/$1",
    ".+\\.(svg)$": "<rootDir>/../../__mocks__/fileMock.js",
    "^lucide-react%": "<rootDir>/../../__mocks__/lucide-react.jsx",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/index.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", {
      presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
      ],
    }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
};

export default customConfig;
