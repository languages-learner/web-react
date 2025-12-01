import { ComponentWrapperClassName } from "../constants";

import {
    type Theme,
    expectScreenshotFixtureFactory,
    waitImagesLoaded,
} from "@/tests/shared/playwright-utils";

const THEMES: Theme[] = ["light", "dark"];

export const testWithExpectScreenshot = expectScreenshotFixtureFactory({
    themes: THEMES,
    onSwitchTheme: async (currentTheme, page) => {
        const html = await page.locator("html");
        await html.evaluate(
            (node, params) => {
                params.themes.forEach((theme) => {
                    const isCurrent = theme === params.currentTheme;
                    node.classList.toggle(theme, isCurrent);
                });
            },
            {
                currentTheme,
                themes: THEMES,
            },
        );
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
