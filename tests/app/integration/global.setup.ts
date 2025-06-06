import path from "path";
import { fileURLToPath } from "url";

import { test } from "@playwright/test";

import { commonSetup } from "../core";

import { STORAGE_STATE_FILE_NAME } from "@/tests/shared/constants";

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
