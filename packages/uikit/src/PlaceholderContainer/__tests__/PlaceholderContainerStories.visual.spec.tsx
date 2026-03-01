import { test } from "@languages-learner/component-core-tests-utils";

import { PlaceholderContainerStories } from "./lib";

test.describe("PlaceholderContainerStories", () => {
    test("render story: Statuses", async ({ mount, expectScreenshot }) => {
        await mount(<PlaceholderContainerStories.Statuses />);

        await expectScreenshot();
    });
});
