import fs from "fs";

import { type Page, test } from "@playwright/test";

import { LandingPage } from "@/tests/pages/landing/LandingPage";

export type LoginConfig = {
    storageStateFilePath: string;
    authLogin?: string;
    authPassword?: string;
    onAfterLogin?: (page: Page) => Promise<void>;
};

export const login = async (config: LoginConfig, page: Page) => {
    await test.step(`Logging in into account ${config.authLogin}`, async () => {
        const pathToFile = config.storageStateFilePath;

        if (fs.existsSync(pathToFile)) {
            await test.step("Loading auth info to browser", async () => {
                const rawContent = fs.readFileSync(pathToFile, { encoding: "utf-8" });
                const parsedContent = JSON.parse(rawContent);
                const { origins } = parsedContent;

                for (const origin of origins) {
                    for (const localStorageItem of origin.localStorage) {
                        await page.context().addInitScript((item) => {
                            window.localStorage.setItem(item.name, item.value);
                        }, localStorageItem);
                    }
                }
            });
        } else {
            const landingPage = new LandingPage(page);

            await test.step("Do login", async () => {
                await landingPage.open();
                await landingPage.login({
                    login: config.authLogin ?? "",
                    password: config.authPassword ?? "",
                });
                await landingPage.checkIfAuthorized();
            });

            await config.onAfterLogin?.(page);

            await test.step(`Writing storage state with auth info to ${pathToFile}`, async () => {
                await page.context().storageState({
                    path: pathToFile,
                });
            });

            // eslint-disable-next-line no-console
            console.log(`File "${config.storageStateFilePath}" with user session created!`);
        }
    });
};
