import { type Page } from "@playwright/test";

import { patchToWithLocale } from "@/shared/react-router/locale";
import { officeRoutes } from "@/shared/routes";
import { TEST_LOCALE } from "@/tests/constants";

export class OfficeProfilePage {
    // eslint-disable-next-line @typescript-eslint/parameter-properties
    constructor(private readonly page: Page) {}

    async open() {
        await this.page.goto(String(patchToWithLocale(officeRoutes.profile, TEST_LOCALE)));
        await this.page.waitForLoadState("networkidle");
    }
}
