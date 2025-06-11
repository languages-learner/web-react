import { ComponentWrapperClassName } from "../constants";

import { expectScreenshotFixtureFactory, waitImagesLoaded } from "@/tests/shared/playwright-utils";

export const testWithExpectScreenshot = expectScreenshotFixtureFactory({
    themes: ["light", "dark"],
    onSwitchTheme: async (theme, page) => {
        await page.emulateMedia({ colorScheme: theme });
    },
    getLocator: async (page) => {
        return page.locator(`.${ComponentWrapperClassName}`);
    },
    options: {
        animations: "disabled",
    },
    onBeforeScreenshot: async (page) => {
        await waitImagesLoaded(page);
    },
});
