import { test } from "@languages-learner/component-core-tests-utils";

import { BasePlaceholderContainerStories } from "./lib";

test.describe("BasePlaceholderContainer", () => {
    test("render story: Default", async ({ mount, expectScreenshot }) => {
        await mount(<BasePlaceholderContainerStories.Default />);

        await expectScreenshot();
    });
});
