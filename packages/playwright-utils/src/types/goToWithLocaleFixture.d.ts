import type { Page as BasePage, Response } from "@playwright/test";

declare module "@playwright/test" {
    interface Page extends BasePage {
        goToWithLocale: (path: string, locale?: string) => Promise<Response | null>;
    }
}
