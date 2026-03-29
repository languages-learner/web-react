import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import { bundleStats } from "rollup-plugin-bundle-stats";
import { defineConfig } from "vite";

import { BUNDLE_STATS_BASELINE_PATH, BUNDLE_STATS_DIR } from "./project.config";

dotenv.config({ path: "../../.env" });

const isBaseline = process.env.BUNDLE_STATS_BASELINE === "true";

// https://vite.dev/config/
export default defineConfig({
    build: {
        // No manualChunks: splitting @heroui / @tanstack / etc. from react caused prod
        // "Cannot read properties of undefined (reading 'createContext')".
        rollupOptions: {
            treeshake: true,
        },
    },
    resolve: {
        alias: {
            "@@": path.resolve(__dirname, "."),
            "@": path.resolve(__dirname, "./src/ui"),
            locales: path.resolve(__dirname, "./src/locales"),
            shared: path.resolve(__dirname, "./src/shared"),
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
        bundleStats({
            baseline: isBaseline,
            // .bundle-stats
            outDir: `../../${BUNDLE_STATS_DIR}`,
            baselineFilepath: `../${BUNDLE_STATS_BASELINE_PATH}`,
            compare: !isBaseline,
            json: true,
            html: true,
        }),
        tailwindcss({
            optimize: {
                minify: true,
            },
        }),
    ],
    server: {
        // For docker tests running on DEV server (npm run dev)
        allowedHosts: ["host.docker.internal"],
    },
});
