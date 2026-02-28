import { login } from "../utils/login";

import type { Page } from "@playwright/test";

export interface CommonSetupParams {
    baseURL?: string;
    page: Page;
    storageStateFilePath: string;
}

export async function commonSetup({ baseURL, storageStateFilePath, page }: CommonSetupParams) {
    if (!baseURL) {
        throw new Error("Base url is not defined! Please provide base URL in config file");
    }

    await login(
        {
            storageStateFilePath,

            authLogin: process.env.AUTH_LOGIN,
            authPassword: process.env.AUTH_PASSWORD,
        },
        page,
    );

    // await waitHostRunning(baseURL, page);
}
