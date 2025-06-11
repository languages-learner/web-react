// import { expect, test } from "@playwright/test";

// import storybook from "../../.storybook/dist/index.json" with { type: "json" };

// // Only run tests on stories, not other documentation pages.
// const stories = Object.values(storybook.entries).filter((e) => e.type === "story");

// for (const story of stories) {
//     for (const theme of ["light", "dark"]) {
//         test(`${story.title} ${story.name} (${theme}) should not have visual regressions`, async ({
//             page,
//         }, workerInfo) => {
//             const params = new URLSearchParams({
//                 id: story.id,
//                 viewMode: "story",
//                 globals: `theme:${theme}`,
//             });

//             await page.goto(`/iframe.html?${params.toString()}`);
//             await page.waitForSelector("#storybook-root");
//             await page.waitForLoadState("networkidle");

//             await expect(page).toHaveScreenshot(
//                 `${story.id}-${workerInfo.project.name}-${process.platform}-${theme}.png`,
//                 {
//                     fullPage: true,
//                     animations: "disabled",
//                 },
//             );
//         });
//     }
// }
