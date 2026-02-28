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
            entry: ["src/ui/app/entries/*.{js,ts,jsx,tsx}", "src/server/main.ts"],
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
            ignoreDependencies: ["formatjs", "core", "babel-plugin-formatjs"],
        },
        "apps/web-e2e": {
            ignore: "**/*",
            // playwright: {
            //     config: ["**/playwright.config.ts"],
            //     entry: ["integration/global.setup.ts", "integration/tests/**/*.{js,ts,jsx,tsx}"],
            // },
        },
        "apps/storybook": {
            project: ["**/*"],
            ignoreDependencies: ["@heroui/theme"],
        },
        "packages/*": {
            project: "**/*.{js,ts,tsx,mjs}",
        },
        "packages/uikit": {
            project: "**/*.{js,ts,tsx,mjs}",
            entry: ["tests/component/playwright/index.tsx"],
        },
    },

    ignoreDependencies: ["react", "react-dom", "@types/react-dom"],
    ignore: [
        // Tests snapshots images
        "**/*-snapshots/*",
    ],
    rules: {
        types: "off",
        exports: "off",
    },
};

export default config;
