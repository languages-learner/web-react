import { test } from "@/tests/app/integration/core";
import { OfficeSettingsPage } from "@/tests/app/pages/office/OfficeSettingsPage";

test.describe("office settings page @office", () => {
    test("visual", async ({ page, expectScreenshot }) => {
        const testPage = new OfficeSettingsPage(page);
        await testPage.open();
        await expectScreenshot({ options: { fullPage: true } });
    });
});
