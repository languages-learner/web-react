import path from "path";

import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();
// https://vite.dev/config/
export default defineConfig({
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
    ssr: {
        noExternal: ["@gravity-ui/uikit"],
    },
});
