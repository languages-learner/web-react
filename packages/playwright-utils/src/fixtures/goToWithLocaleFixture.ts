import { patchToWithLocale } from "@languages-learner/react-router-utils";
import { test as baseTest } from "@playwright/test";

export type GoToWithLocaleFixtureFactoryParams = {
    locale: string;
};

export const testWithGoToWithLocaleFactory = (
    factoryParams: GoToWithLocaleFixtureFactoryParams,
) => {
    return baseTest.extend({
        page: async ({ page }, use) => {
            page.goToWithLocale = async function (path, locale) {
                const result = await page.goto(
                    patchToWithLocale(path, locale ?? factoryParams.locale).toString(),
                );
                await page.waitForLoadState("networkidle");

                return result;
            };

            // eslint-disable-next-line react-hooks/rules-of-hooks
            await use(page);
        },
    });
};
