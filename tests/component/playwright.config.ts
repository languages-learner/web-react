import * as path from "path";

import { defineConfig, devices } from "@playwright/experimental-ct-react";

const pathFromRoot = (p: string) => {
    return path.resolve(__dirname, "../..", p);
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    tsconfig: pathFromRoot("tests/component/tsconfig.json"),
    testDir: pathFromRoot("src/ui"),
    testMatch: "*.spec.*",
    /* Maximum time one test can run for */
    timeout: 10000,
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
        headless: true,
        ctPort: 3100,
        timezoneId: "America/New_York",
        ctViteConfig: {
            resolve: {
                alias: {
                    "@@": pathFromRoot("."),
                    "@": pathFromRoot("./src/ui"),
                    locales: pathFromRoot("./src/locales"),
                },
            },
        },
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
    snapshotPathTemplate:
        "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}-linux{ext}",
});
