import { mergeTests } from "@playwright/test";

import { testWithExpectScreenshot } from "./fixtures/expectScreenshotFixture";

export const test = mergeTests(testWithExpectScreenshot);
