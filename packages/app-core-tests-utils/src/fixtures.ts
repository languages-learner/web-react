import {
    TEST_LOCALE,
    expectScreenshotFixtureFactory,
    testWithGoToWithLocaleFactory,
    waitImagesLoaded,
} from "@languages-learner/playwright-utils";

export const testWithExpectScreenshot = expectScreenshotFixtureFactory({
    themes: ["light", "dark"],
    onSwitchTheme: async (theme, page) => {
        await page.emulateMedia({ colorScheme: theme });
    },
    onBeforeScreenshot: async (page) => {
        await waitImagesLoaded(page);
    },
});

export const testWithGoToWithLocale = testWithGoToWithLocaleFactory({
    locale: TEST_LOCALE,
});
