import type { Page } from "@playwright/test";

/**
 * Waits for all images on the page to be fully loaded.
 * It locates all image elements on the page, checks if they are already complete,
 * and if not, waits for their 'load' event.
 */
export const waitImagesLoaded = async (page: Page) => {
    const locators = await page.locator("//img").all();
    const promises = locators.map((locator) =>
        locator.evaluate(
            (image: HTMLImageElement) =>
                image.complete ||
                new Promise<unknown>((resolve) => image.addEventListener("load", resolve)),
        ),
    );
    await Promise.all(promises);
};
