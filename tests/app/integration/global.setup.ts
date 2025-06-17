import * as path from "path";

import { commonSetup } from "../core";

import { test } from "@/tests/app/core";
import { getAuthStorageStateFileName } from "@/tests/shared/auth-storage";

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
