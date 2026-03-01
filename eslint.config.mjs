// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { tanstackConfig } from "@tanstack/eslint-config";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importNewLinesPlugin from "eslint-plugin-import-newlines";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import formatjs from "eslint-plugin-formatjs";

export default tseslint.config(
    ...tanstackConfig,
    eslintPluginPrettierRecommended,
    react.configs.flat.recommended,
    reactHooks.configs["recommended-latest"],
    { ignores: ["**/dist", "**/dist-storybook", "node_modules", "**/.cache", "**/.typecheck"] },
    {
        files: ["**/*.{js,ts,tsx}"],
        plugins: {
            "import-newlines": importNewLinesPlugin,
            formatjs,
        },
        rules: {
            // Import
            "import/no-named-as-default": "off",
            "import/no-extraneous-dependencies": "error",

            // Typescript
            "react/react-in-jsx-scope": "off",
            "newline-before-return": "error",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "object-curly-spacing": ["error", "always"],

            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    fixStyle: "inline-type-imports",
                },
            ],
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "typeParameter",
                    format: ["PascalCase"],
                    leadingUnderscore: "forbid",
                    trailingUnderscore: "forbid",
                },
            ],
            "@typescript-eslint/array-type": "off",
            "comma-dangle": ["error", "always-multiline"],
            "react/prop-types": "off",
            "linebreak-style": ["error", "unix"],

            // Formatjs
            "formatjs/enforce-id": [
                "error",
                {
                    idInterpolationPattern: "[sha512:contenthash:base64:6]",
                },
            ],
        },
        settings: {
            react: { version: "detect" },
        },
    },
    storybook.configs["flat/recommended"],
);
