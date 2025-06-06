import { test } from "@/tests/integration/core";
import { DictionaryPage } from "@/tests/pages/dictionary/DictionaryPage";

test.describe("dictionary page @dictionary", () => {
    test("visual", async ({ page, expectScreenshot }) => {
        const testPage = new DictionaryPage(page);
        await testPage.open();
        await expectScreenshot({ options: { fullPage: true } });
    });
});
