import { type Page } from "@playwright/test";

import { workspaceRoutes } from "@/shared/routes";

export class DictionaryPage {
    constructor(
        // eslint-disable-next-line @typescript-eslint/parameter-properties
        private readonly page: Page,
    ) {}

    async open() {
        await this.page.goToWithLocale(workspaceRoutes.dictionary);
    }
}
