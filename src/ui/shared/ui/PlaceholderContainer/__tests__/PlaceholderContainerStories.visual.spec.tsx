import { PlaceholderContainerStories } from "./lib";

import { test } from "@/tests/component/core";

test.describe("PlaceholderContainerStories", () => {
    test("render story: Statuses", async ({ mount, expectScreenshot }) => {
        await mount(<PlaceholderContainerStories.Statuses />);

        await expectScreenshot();
    });
});
