import { expect } from "@playwright/experimental-ct-react";

import { ComponentWrapperClassName } from "./constants";

import type { ExpectScreenshotFixture, PlaywrightFixture } from "./types";

export const expectScreenshotFixture: PlaywrightFixture<ExpectScreenshotFixture> = async (
    { page },
    use,
    testInfo,
) => {
    const expectScreenshot: ExpectScreenshotFixture = async ({
        component,
        screenshotName,
        ...pageScreenshotOptions
    } = {}) => {
        const captureScreenshot = async () => {
            return (component || page.locator(`.${ComponentWrapperClassName}`)).screenshot({
                animations: "disabled",
                ...pageScreenshotOptions,
            });
        };

        const nameScreenshot = testInfo.titlePath.slice(1).join(" ");

        expect(await captureScreenshot()).toMatchSnapshot({
            name: `${screenshotName || nameScreenshot} light.png`,
        });

        await page.emulateMedia({ colorScheme: "dark" });

        expect(await captureScreenshot()).toMatchSnapshot({
            name: `${screenshotName || nameScreenshot} dark.png`,
        });
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(expectScreenshot);
};
