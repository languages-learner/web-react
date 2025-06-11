import { mergeTests } from "@playwright/test";

import { testWithExpectScreenshot, testWithGoToWithLocale } from "./fixtures";

export const test = mergeTests(testWithExpectScreenshot, testWithGoToWithLocale);
