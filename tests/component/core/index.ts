import { test as baseTest, expect } from "@playwright/experimental-ct-react";

import { mountFixture } from "./mountFixture";
import { type Fixtures } from "./types";

import { expectScreenshotFixture } from "@/tests/component/core/expectScreenshotFixture";

export const test = baseTest.extend<Fixtures>({
    mount: mountFixture,
    expectScreenshot: expectScreenshotFixture,
});

export { expect };
