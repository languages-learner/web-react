import type { KnipConfig } from "knip";

const config: KnipConfig = {
    entry: [
        "src/ui/app/entries/*.{js,ts,jsx,tsx}",
        "src/server/main.ts",
        "tests/app/integration/global.setup.ts",
        "tests/app/integration/tests/**/*.ts",
    ],
    project: ["src/**/*.{js,ts,jsx,tsx}", "tests/**/*.{js,ts,jsx,tsx}"],
    ignore: ["**/*.d.ts", "tests/component/playwright/index.tsx"],
    ignoreDependencies: ["crypto", "npm-run-all", "core", "formatjs", "babel-plugin-formatjs"],
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
