import { mergeTests } from "@playwright/test";

import { testWithExpectScreenshot } from "./fixtures/expectScreenshotFixture";
import { testWithMountFixture } from "./fixtures/mountFixture";

export const test = mergeTests(testWithExpectScreenshot, testWithMountFixture);
