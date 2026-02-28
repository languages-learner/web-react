import fs from "node:fs/promises";
import path from "node:path";

import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";

import { localeMiddleware } from "./middlewares/locale";
import { themeMiddleware } from "./middlewares/theme";
import { userMiddleware } from "./middlewares/user";
import type { ViteDevServer } from "vite";
import type { Response } from "core";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const createServer = async () => {
    const templateHtml = isProduction ? await fs.readFile("./dist/client/index.html", "utf-8") : "";

    const app = express();
    let vite: ViteDevServer;

    if (isProduction) {
        const compression = (await import("compression")).default;
        const sirv = (await import("sirv")).default;
        app.use(compression());
        app.use(base, sirv("./dist/client", { extensions: [] }));
    } else {
        const { createServer: createViteServer } = await import("vite");
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "custom",
            logLevel: "info",
            base,
        });
        app.use(vite.middlewares);
    }

    app.use(cookieParser());
    app.use(userMiddleware);
    app.use(localeMiddleware);
    app.use(themeMiddleware);

    // Serve HTML
    app.use("*all", async (req, res: Response) => {
        try {
            const url = req.originalUrl.replace(base, "");

            let template: string;
            let render;
            if (isProduction) {
                template = templateHtml;

                // @ts-expect-error
                render = (await import("../../dist/server/main-server.mjs")).render;
            } else {
                // Always read fresh template in development
                template = await fs.readFile("./index.html", "utf-8");
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule("./src/ui/app/entries/main-server.tsx")).render;
            }

            const rendered = await render?.(res.locals);

            const html = template
                .replace(`<!--app-head-->`, rendered.head ?? "")
                .replace(`<!--app-html-->`, rendered.html ?? "")
                .replace(`<html`, `<html class="${res.locals.theme}"`)
                .replace("window.CLIENT = {}", `window.CLIENT = ${JSON.stringify(res.locals)}`);

            res.status(200).set({ "Content-Type": "text/html" }).send(html);
        } catch (e) {
            // @ts-expect-error
            vite.ssrFixStacktrace(e);

            // @ts-expect-error
            console.log(e.stack);

            // @ts-expect-error
            res.status(500).end(e.stack);
        }
    });

    // Start http server
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
};

createServer();
