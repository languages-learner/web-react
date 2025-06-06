import { expectScreenshotFixtureFactory, waitImagesLoaded } from "@/tests/shared/playwright-utils";

export const testWithExpectScreenshot = expectScreenshotFixtureFactory({
    themes: ["light", "dark"],
    onSwitchTheme: async (theme, page) => {
        await page.emulateMedia({ colorScheme: theme });
    },
    onBeforeScreenshot: async (page) => {
        await waitImagesLoaded(page);
    },
});
