import * as process from "node:process";
import * as path from "path";

import { defineConfig, devices } from "@playwright/experimental-ct-react";
import * as dotenv from "dotenv";

import { getAuthStorageStateFileName } from "../../shared/auth-storage";
import { validateTestEnvironment } from "../core/utils/validateTestEnvironment";

const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath, override: false });

const { BASE_URL } = process.env;

const pathFromRoot = (p: string) => {
    return path.resolve(__dirname, "../../..", p);
};

if (!validateTestEnvironment()) {
    process.exit(1);
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    tsconfig: pathFromRoot("tests/app/tsconfig.json"),
    testDir: pathFromRoot("tests/app/integration/tests"),
    testMatch: "*.spec.*",
    /* Maximum time one test can run for */
    timeout: 30000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
        // toMatchSnapshot: {
        //     threshold: 0.2,
        // },
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: Boolean(process.env.CI),
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 2 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
        // ignoreHTTPSErrors: true,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: BASE_URL,
        timezoneId: "America/New_York",
        launchOptions: {
            timeout: 60000,
        },
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: "global_setup",
            testDir: "./",
            testMatch: /global\.setup\.ts/,
            timeout: process.env.CI ? 2 * 60 * 1000 : 30000,
        },
        {
            name: "chromium",
            dependencies: ["global_setup"],
            use: {
                ...devices["Desktop Chrome"],
                storageState: path.resolve(__dirname, getAuthStorageStateFileName(BASE_URL)),
            },
        },
    ],
    snapshotPathTemplate:
        "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}-linux{ext}",
});
