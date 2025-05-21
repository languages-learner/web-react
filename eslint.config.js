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
            // "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            react,
            import: importPlugin,
            "import-newlines": importNewLinesPlugin,
        },
        rules: {
            // Import rules
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
                        // {
                        //     pattern: '{@yandex-**,@gravity-ui}/**',
                        //     group: 'external',
                        //     position: 'after',
                        // },
                        // {
                        //     pattern: '@($*|$*/**/*)',
                        //     group: 'internal',
                        //     position: 'before',
                        // },
                        // {
                        //     pattern: '{shared/**,$*,$*/**}',
                        //     group: 'internal',
                        //     position: 'before',
                        // },
                        // {
                        //     pattern: '__*__/**/*',
                        //     group: 'internal',
                        //     position: 'after',
                        // },
                        // {
                        //     pattern: '*.{svg,png,jpg,jpeg,json}',
                        //     patternOptions: {
                        //         dot: true,
                        //         nocomment: true,
                        //         matchBase: true,
                        //     },
                        //     group: 'type',
                        //     position: 'after',
                        // },
                        // {
                        //     pattern: 'ui/!(units){,/**}',
                        //     group: 'parent',
                        //     position: 'before',
                        // },
                        // {
                        //     pattern: '{ui/units,ui/units/**}',
                        //     group: 'parent',
                        //     position: 'after',
                        // },
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
            // "import-newlines/enforce": [
            //     "error",
            //     {
            //         items: 3,
            //         "max-len": 1000,
            //         semi: true,
            //     },
            // ],

            ...reactHooks.configs.recommended.rules,
            ...react.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "react/react-in-jsx-scope": "off",
            // indent: ["error", 4],
            "newline-before-return": "error",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "object-curly-spacing": ["error", "always"],
            quotes: ["error", "double"],
            "prefer-destructuring": ["error", { object: true, array: false }],
            // semi: ["error", "never"],
            // "sort-imports": [
            //     "error",
            //     {
            //         ignoreDeclarationSort: true,
            //     },
            // ],
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    fixStyle: "inline-type-imports",
                },
            ],
            // "import/order": [
            //     "error",
            //     {
            //         groups: [
            //             "index",
            //             "sibling",
            //             "parent",
            //             "internal",
            //             "external",
            //             "builtin",
            //             "object",
            //             "type",
            //         ],
            //     },
            // ],

            "comma-dangle": ["error", "always-multiline"],
        },
        settings: {
            react: { version: "detect" },
        },
    },
);
