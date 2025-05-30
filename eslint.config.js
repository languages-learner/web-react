import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import importNewLinesPlugin from "eslint-plugin-import-newlines";
import baseConfig from "@gravity-ui/eslint-config";
import clientConfig from "@gravity-ui/eslint-config/client";
import prettierConfig from "@gravity-ui/eslint-config/prettier";
import formatjs from "eslint-plugin-formatjs";

export default tseslint.config(
    ...baseConfig,
    ...prettierConfig,
    ...clientConfig,
    { ignores: ["dist", "node_modules"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-refresh": reactRefresh,
            react,
            import: importPlugin,
            "import-newlines": importNewLinesPlugin,
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

            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "react/react-in-jsx-scope": "off",
            "newline-before-return": "error",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "object-curly-spacing": ["error", "always"],
            "prefer-destructuring": ["error", { object: true, array: false }],

            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    fixStyle: "inline-type-imports",
                },
            ],
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
);
