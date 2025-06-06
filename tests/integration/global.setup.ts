import path from "path";
import { fileURLToPath } from "url";

import { test } from "@playwright/test";

import { STORAGE_STATE_FILE_NAME } from "../constants";
import { commonSetup } from "../core/setup/commonSetup";

const dirname =
    typeof __dirname === "undefined" ? path.dirname(fileURLToPath(import.meta.url)) : __dirname;

test("integration tests global setup", async ({ baseURL, page }) => {
    try {
        await commonSetup({
            page,
            baseURL,
            storageStateFilePath: path.resolve(dirname, STORAGE_STATE_FILE_NAME),
        });
    } catch (error) {
        console.error("Error during globalSetup:", error);
        if (!process.env.CI) {
            throw error;
        }
    }
});
