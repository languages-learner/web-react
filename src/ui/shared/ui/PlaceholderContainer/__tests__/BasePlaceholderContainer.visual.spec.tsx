import { BasePlaceholderContainerStories } from "./lib";

import { test } from "@/tests/component/core";

test.describe("BasePlaceholderContainer", () => {
    test("render story: Default", async ({ mount, expectScreenshot }) => {
        await mount(<BasePlaceholderContainerStories.Default />);

        await expectScreenshot();
    });
});
