import { fileURLToPath } from "node:url";
import path from "path";

import storybookTest from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dirname =
    typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@@": path.resolve(__dirname, "."),
            "@": path.resolve(__dirname, "./src/ui"),
            locales: path.resolve(__dirname, "./src/locales"),
        },
    },
    plugins: [
        react({
            babel: {
                plugins: [
                    [
                        "formatjs",
                        {
                            idInterpolationPattern: "[sha512:contenthash:base64:6]",
                            ast: true,
                        },
                    ],
                ],
            },
        }),
        storybookTest({ configDir: path.join(dirname, ".storybook") }),
    ],
    test: {
        name: "storybook",
        browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
        },
        setupFiles: [".storybook/vitest.setup.ts"],
    },
});
