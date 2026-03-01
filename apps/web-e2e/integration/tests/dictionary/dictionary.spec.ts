import { test } from "@/tests/app/integration/core";
import { DictionaryPage } from "@/tests/app/pages/dictionary/DictionaryPage";

test.describe("dictionary page @dictionary", () => {
    test("visual", async ({ page, expectScreenshot }) => {
        await page.route("*/**/rest/v1/words**", async (route) => {
            const json = [];
            json.push({
                id: "e77753b4-4739-4d66-bd90-e911eb1f466c",
                user_id: "user_id",
                created_at: "2025-05-31T20:42:33.237739+00:00",
                updated_at: "2025-05-31T20:42:33.237739",
                language: "en",
                text: "test",
                status: "Learn",
                sort_id: 22,
                translations: [
                    {
                        id: "a42f7a2f-cd0c-4390-857e-21f9573e4624",
                        text: "test",
                        language: "ru",
                    },
                ],
            });
            await route.fulfill({ json });
        });

        const testPage = new DictionaryPage(page);
        await testPage.open();
        await expectScreenshot({ options: { fullPage: true } });
    });
});
