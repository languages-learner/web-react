import { type Page as BasePage, type Response } from "@playwright/test";

declare module "@playwright/test" {
    interface Page extends BasePage {
        goToWithLocale(path: string, locale?: string): Promise<Response | null>;
    }
}
