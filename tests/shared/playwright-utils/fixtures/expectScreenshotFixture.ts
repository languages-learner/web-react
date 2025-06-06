import { test as baseTest, expect } from "@playwright/test";
import lodash from "lodash";

import { type Theme } from "../types/types";

import type {
    Locator,
    Page,
    PageAssertionsToHaveScreenshotOptions,
    TestInfo,
} from "@playwright/test";

export type OnSwitchThemeCallback = (theme: Theme, page: Page) => Promise<void>;

export type MatchScreenshotParams = {
    locator?: Locator | Page;
    name?: string;
    options?: PageAssertionsToHaveScreenshotOptions;
    themes?: Theme[];
    onSwitchTheme?: OnSwitchThemeCallback;
    onBeforeScreenshot?: (page: Page) => Promise<void>;
    testInfo: TestInfo;
};

export async function matchScreenshot(page: Page, params: MatchScreenshotParams) {
    const { themes, onSwitchTheme, options, locator, name, testInfo, onBeforeScreenshot } = params;

    const resolvedThemes = themes ?? ["light"];

    await onBeforeScreenshot?.(page);

    for (const theme of resolvedThemes) {
        await onSwitchTheme?.(theme, page);

        const resolvedName = [name || testInfo.titlePath.slice(1).join(" "), `${theme}.png`].join(
            " ",
        );

        await expect(locator || page).toHaveScreenshot(resolvedName, options);
    }
}

export type ExpectScreenshotFixtureFactoryParams = Partial<
    Pick<MatchScreenshotParams, "themes" | "onSwitchTheme" | "options" | "onBeforeScreenshot">
> & {
    getLocator?: (page: Page) => Promise<Locator | Page>;
};

export type ExpectScreenshotFixture = (
    params?: Omit<MatchScreenshotParams, "testInfo">,
) => Promise<void>;

export function expectScreenshotFixtureFactory(
    factoryParams: ExpectScreenshotFixtureFactoryParams = {},
) {
    return baseTest.extend<{
        expectScreenshot: ExpectScreenshotFixture;
    }>({
        expectScreenshot: async ({ page }, use, testInfo) => {
            const wrapper: ExpectScreenshotFixture = async (params) => {
                const resolvedParams: MatchScreenshotParams = lodash.merge(
                    {
                        locator: await factoryParams.getLocator?.(page),
                        testInfo,
                    },
                    factoryParams,
                    params,
                );

                return matchScreenshot(page, resolvedParams);
            };

            // eslint-disable-next-line react-hooks/rules-of-hooks
            await use(wrapper);
        },
    });
}
