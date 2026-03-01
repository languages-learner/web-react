import type { Page } from "@playwright/test";

import { officeRoutes } from "@/shared/routes";

export class OfficeSettingsPage {
    constructor(private readonly page: Page) {}

    async open() {
        await this.page.goToWithLocale(officeRoutes.settings);
    }
}
