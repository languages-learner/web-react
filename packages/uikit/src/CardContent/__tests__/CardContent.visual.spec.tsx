import { test } from "@languages-learner/component-core-tests-utils";

import { Stories } from "./lib";

test.describe("CardContent", () => {
    test("render story: Default", async ({ mount, expectScreenshot }) => {
        await mount(<Stories.Default />);

        await expectScreenshot();
    });
});
