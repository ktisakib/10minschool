import { config } from "@enterprise/eslint-config/react-internal"

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ["coverage/**", "dist/**", "node_modules/**"]
  }
]
