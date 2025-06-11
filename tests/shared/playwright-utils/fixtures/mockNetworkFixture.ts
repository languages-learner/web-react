import { access } from "node:fs/promises";
import { resolve } from "node:path";

import { type BrowserContext, type TestInfo, test as baseTest } from "@playwright/test";

import { sanitizeHarFile } from "@/packages/har-sanitizer";

type RouteFromHarOptionsType = NonNullable<Parameters<BrowserContext["routeFromHAR"]>[1]>;

export type UrlToReplace = {
    fromUrl: string;
    toUrl: string;
};

export type MockedNetworkFixtureFactoryParams = {
    routeFromHarOptions?: Omit<RouteFromHarOptionsType, "url">;
    url: (baseUrl: string) => RouteFromHarOptionsType["url"];
    dumpsFilePath: (params: { testInfo: TestInfo }) => string;
    urlsToReplace?: (baseUrl: string) => UrlToReplace[];
    forceUpdateIfHarMissing?: boolean;
};

export const testWithMockedNetworkFactory = (factoryParams: MockedNetworkFixtureFactoryParams) => {
    const testWithGoToWithLocale = baseTest.extend<{ mockNetwork: void }>({
        mockNetwork: [
            async ({ page, baseURL }, use, testInfo) => {
                if (!baseURL) {
                    throw new Error("baseURL should be specified in playwright config");
                }

                let harPath = factoryParams.dumpsFilePath({ testInfo });
                harPath = resolve(harPath);

                let update = factoryParams.routeFromHarOptions?.update;
                if (!update && factoryParams.forceUpdateIfHarMissing) {
                    try {
                        await access(harPath);
                    } catch {
                        update = true;
                    }
                }

                const url = factoryParams.url(baseURL);

                await page.context().routeFromHAR(harPath, {
                    update,
                    notFound: factoryParams.routeFromHarOptions?.notFound,
                    url,
                });

                await use();
            },
            { auto: true },
        ],
    });

    testWithGoToWithLocale.afterAll("sanitize har", async ({ baseURL }, testInfo) => {
        if (!baseURL) {
            return;
        }

        let harPath = factoryParams.dumpsFilePath({ testInfo });
        harPath = resolve(harPath);

        let fileExist = true;
        try {
            await access(harPath);
        } catch {
            fileExist = false;
        }

        if (fileExist) {
            await sanitizeHarFile(harPath);
        }
    });

    return testWithGoToWithLocale;
};
