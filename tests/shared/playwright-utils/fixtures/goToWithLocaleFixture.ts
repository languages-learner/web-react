import { test as baseTest } from "@playwright/test";

import { getPathWithLocale } from "@/shared/react-router";

export type GoToWithLocaleFixtureFactoryParams = {
    locale: string;
};

export const testWithGoToWithLocaleFactory = (
    factoryParams: GoToWithLocaleFixtureFactoryParams,
) => {
    return baseTest.extend({
        page: async ({ page }, use) => {
            // eslint-disable-next-line no-param-reassign
            page.goToWithLocale = async function (path, locale) {
                const result = await page.goto(
                    getPathWithLocale(path, locale ?? factoryParams.locale),
                );
                await page.waitForLoadState("networkidle");

                return result;
            };

            await use(page);
        },
    });
};
