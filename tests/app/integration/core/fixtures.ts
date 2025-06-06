import { TEST_LOCALE } from "@/tests/shared/constants";
import {
    expectScreenshotFixtureFactory,
    testWithGoToWithLocaleFactory,
    waitImagesLoaded,
} from "@/tests/shared/playwright-utils";

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
