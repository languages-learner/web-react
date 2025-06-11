import * as path from "path";

import { commonSetup } from "../core";

import { test } from "@/tests/app/core";
import { STORAGE_STATE_FILE_NAME } from "@/tests/shared/constants";

test("integration tests global setup", async ({ baseURL, page }) => {
    try {
        await commonSetup({
            page,
            baseURL,
            storageStateFilePath: path.resolve(__dirname, STORAGE_STATE_FILE_NAME),
        });
    } catch (error) {
        console.error("Error during globalSetup:", error);
        if (!process.env.CI) {
            throw error;
        }
    }
});
