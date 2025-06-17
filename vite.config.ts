import path from "path";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
        storybookTest({ configDir: path.join(__dirname, ".storybook") }),
    ],
    server: {
        host: "0.0.0.0",
        port: 5173,
        watch: {
            usePolling: true,
        },
        allowedHosts: ["host.docker.internal"],
    },
    preview: {
        host: true,
        port: 8080,
    },
});
