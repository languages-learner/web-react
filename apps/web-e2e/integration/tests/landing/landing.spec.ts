import { test } from "@/tests/app/integration/core";
import { LandingPage } from "@/tests/app/pages/landing/LandingPage";

test.describe("landing page @landing", () => {
    test("visual", async ({ page, expectScreenshot }) => {
        const testPage = new LandingPage(page);
        await testPage.open();
        await expectScreenshot({ options: { fullPage: true } });
    });
});
