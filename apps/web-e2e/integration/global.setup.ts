import * as path from "path";

import { getAuthStorageStateFileName } from "@@/packages/playwright-utils/src/auth-storage";

import { commonSetup } from "../core";

import { test } from "@/tests/app/core";

test("integration tests global setup", async ({ baseURL, page }) => {
    try {
        const authStorageStateFileName = getAuthStorageStateFileName(baseURL);
        await commonSetup({
            page,
            baseURL,
            storageStateFilePath: path.resolve(__dirname, authStorageStateFileName),
        });
    } catch (error) {
        console.error("Error during globalSetup:", error);
        if (!process.env.CI) {
            throw error;
        }
    }
});
