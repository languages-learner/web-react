import path from "path";

import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import { bundleStats } from "rollup-plugin-bundle-stats";
import { defineConfig } from "vite";

import { BUNDLE_STATS_BASELINE_PATH, BUNDLE_STATS_DIR } from "./project.config";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    build: {
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
            // .bundle-stats
            outDir: `../../${BUNDLE_STATS_DIR}`,
            baselineFilepath: `../${BUNDLE_STATS_BASELINE_PATH}`,
            compare: true,
            json: true,
            html: true,
        }),
    ],
    ssr: {
        noExternal: ["@gravity-ui/uikit"],
    },
});
