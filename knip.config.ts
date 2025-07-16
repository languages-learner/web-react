import type { KnipConfig } from "knip";

const config: KnipConfig = {
    compilers: {
        svg: () => "",
        jpg: () => "",
        png: () => "",
    },
    entry: [
        "src/ui/app/entries/*.{js,ts,jsx,tsx}",
        "src/server/main.ts",
        "tests/component/playwright/index.tsx",
    ],
    project: ["**/*"],
    playwright: {
        config: ["**/playwright.config.ts"],
        entry: [
            "tests/app/integration/global.setup.ts",
            "tests/app/integration/tests/**/*.{js,ts,jsx,tsx}",
        ],
    },
    ignore: [
        "**/*.d.ts",
        ".husky/install.mjs",

        // Used in index.html
        "public/android-chrome-192x192.png",
        "public/android-chrome-512x512.png",
        "public/apple-touch-icon.png",
        "public/favicon-16x16.png",
        "public/favicon-32x32.png",

        // Tests snapshots images
        "**/*-snapshots/*",
    ],
    ignoreDependencies: [
        "crypto",
        "npm-run-all",
        "core",
        "formatjs",
        "babel-plugin-formatjs",
        "locales/*",
    ],
    paths: {
        "@/tests/*": ["tests/*"],
        "@/packages/*": ["src/packages/*"],
    },
    rules: {
        types: "off",
        exports: "off",
    },
};

export default config;
