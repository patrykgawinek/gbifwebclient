import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import unusedImports from "eslint-plugin-unused-imports";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, [
  globalIgnores(["dist"]),
  {
    plugins: { "unused-imports": unusedImports, "no-relative-import-paths": noRelativeImportPaths },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.mjs", "vitest.config.ts", "vite.config.ts"],
          defaultProject: "./tsconfig.json",
        },
      },
    },
    rules: {
      "no-console": "warn",
      "import/no-default-export": "off",
      "unused-imports/no-unused-imports": "error",
      "react/display-name": "off",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: true,
          rootDir: "src",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          paths: ["src"],
        },
      },
    },
  },
]);
