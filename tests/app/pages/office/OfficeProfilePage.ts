import { type Page } from "@playwright/test";

import { officeRoutes } from "@/shared/routes";

export class OfficeProfilePage {
    // eslint-disable-next-line @typescript-eslint/parameter-properties
    constructor(private readonly page: Page) {}

    async open() {
        await this.page.goToWithLocale(officeRoutes.profile);
    }
}
