// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import baseConfig from "@gravity-ui/eslint-config";
import clientConfig from "@gravity-ui/eslint-config/client";
import prettierConfig from "@gravity-ui/eslint-config/prettier";
import formatjs from "eslint-plugin-formatjs";
import importPlugin from "eslint-plugin-import";
import importNewLinesPlugin from "eslint-plugin-import-newlines";
import oxlint from "eslint-plugin-oxlint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    ...baseConfig,
    ...prettierConfig,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        extends: [...tseslint.configs.recommended],
        plugins: {
            import: importPlugin,
            "import-newlines": importNewLinesPlugin,
        },
        rules: {
            "import/no-named-as-default": "off",
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/order": [
                "error",
                {
                    alphabetize: {
                        order: "asc",
                    },
                    "newlines-between": "always",
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                        "type",
                    ],
                    pathGroups: [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before",
                        },
                        {
                            pattern: "@($*|$*/**/*)",
                            group: "internal",
                            position: "before",
                        },
                        {
                            pattern: "*.{svg,png,jpg,jpeg,json}",
                            patternOptions: {
                                dot: true,
                                nocomment: true,
                                matchBase: true,
                            },
                            group: "type",
                            position: "after",
                        },
                        {
                            pattern: "*.{css,scss}",
                            patternOptions: {
                                dot: true,
                                nocomment: true,
                                matchBase: true,
                            },
                            group: "type",
                            position: "after",
                        },
                    ],
                    pathGroupsExcludedImportTypes: [
                        "*.{css,scss}",
                        "*.{svg,png,jpg,jpeg,json}",
                        "react",
                    ],
                    warnOnUnassignedImports: true,
                },
            ],

            "newline-before-return": "error",
            "object-curly-spacing": ["error", "always"],

            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    fixStyle: "inline-type-imports",
                },
            ],
            "comma-dangle": ["error", "always-multiline"],
            "linebreak-style": ["error", "unix"],
        },
    },
    {
        files: ["src/ui/**"],
        extends: [clientConfig],
        plugins: {
            react,
            formatjs,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...react.configs.recommended.rules,
            "no-restricted-imports": [
                "error",
                {
                    paths: [
                        {
                            name: "react-router",
                            importNames: ["useNavigate"],
                            message: "Please import 'useNavigate' from '@/shared/react-router'",
                        },
                    ],
                },
            ],
            // Formatjs
            "formatjs/enforce-id": [
                "error",
                {
                    idInterpolationPattern: "[sha512:contenthash:base64:6]",
                },
            ],
            "react/prop-types": "off",
        },
        settings: {
            react: { version: "detect" },
        },
    },
    storybook.configs["flat/recommended"],
    { ignores: ["**/dist", "node_modules", "**/.cache", "**/.typecheck", "**/playwright-report"] },
    /**
     * NOTE:
     * - oxling should be the last one
     * - detect rules from existing file
     */
    // ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
);
