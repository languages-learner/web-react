import type { KnipConfig } from "knip";

const config: KnipConfig = {
    compilers: {
        svg: () => "",
        jpg: () => "",
        png: () => "",
    },
    workspaces: {
        ".": {
            entry: "scripts/*.{js,ts}",
            project: "scripts/**/*.{js,ts}",
        },
        "apps/web": {
            entry: [
                "src/ui/app/entries/*.{js,ts,jsx,tsx}",
                "src/server/main.ts",
                // "tests/component/playwright/index.tsx",
            ],
            project: ["**/*"],

            ignore: [
                "**/*.d.ts",

                // Used in index.html
                "public/android-chrome-192x192.png",
                "public/android-chrome-512x512.png",
                "public/apple-touch-icon.png",
                "public/favicon-16x16.png",
                "public/favicon-32x32.png",
            ],
        },
        "apps/web-e2e": {
            playwright: {
                config: ["**/playwright.config.ts"],
                entry: ["integration/global.setup.ts", "integration/tests/**/*.{js,ts,jsx,tsx}"],
            },
        },
        "packages/*": {
            // entry: "src/index.ts",
            project: "**/*.{js,ts}",
        },
        "packages/tailwind": {
            // entry: "index.ts",
            project: "**/*.{js,ts}",
        },
    },

    // ignoreDependencies: [
    //     "crypto",
    //     "npm-run-all",
    //     "core",
    //     "formatjs",
    //     "babel-plugin-formatjs",
    //     "locales/*",
    // ],
    // paths: {
    //     "@/tests/*": ["tests/*"],
    //     "@/packages/*": ["src/packages/*"],
    // },
    ignore: [
        ".husky/install.mjs",
        // Tests snapshots images
        "**/*-snapshots/*",
    ],
    rules: {
        types: "off",
        exports: "off",
    },
};

export default config;
