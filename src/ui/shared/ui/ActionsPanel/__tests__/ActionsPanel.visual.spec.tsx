import { Stories } from "./lib";

import { test } from "@/tests/component/core";

test.describe("ActionsPanel", () => {
    test("render story: Default", async ({ mount, expectScreenshot }) => {
        await mount(<Stories.Default />);

        await expectScreenshot();
    });
});
