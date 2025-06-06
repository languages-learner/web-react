import { type Page, expect } from "@playwright/test";

import { patchToWithLocale } from "@/shared/react-router/locale";
import { landingRoutes } from "@/shared/routes";
import { TEST_LOCALE } from "@/tests/constants";

export class LandingPage {
    // eslint-disable-next-line @typescript-eslint/parameter-properties
    constructor(private readonly page: Page) {}

    async open() {
        await this.page.goto(String(patchToWithLocale(landingRoutes.root, TEST_LOCALE)));
        await this.page.waitForLoadState("networkidle");
    }

    async login({ login, password }: { login: string; password: string }) {
        await this.page.locator("button", { hasText: "Sign in" }).click();
        await expect(this.page.locator("#email")).toBeVisible();
        await this.page.locator("#email").fill(login);
        await this.page.locator("#password").fill(password);
        await this.page.locator("button[type='submit']", { hasText: "Sign in" }).click();
    }

    async checkIfAuthorized() {
        await expect(this.page.locator("button", { hasText: "Go to workspace" })).toBeVisible();
    }
}
