import { test } from "@/tests/integration/core";
import { OfficeProfilePage } from "@/tests/pages/office/OfficeProfilePage";

test.describe("office profile page @office", () => {
    test("visual", async ({ page, expectScreenshot }) => {
        const testPage = new OfficeProfilePage(page);
        await testPage.open();
        await expectScreenshot({ options: { fullPage: true } });
    });
});
