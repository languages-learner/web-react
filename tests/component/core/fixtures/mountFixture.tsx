import {
    type MountOptions,
    type MountResult,
    test as baseTest,
} from "@playwright/experimental-ct-react";

import { ComponentWrapperClassName } from "../constants";

export type MountFixture = <HooksConfig>(
    component: React.JSX.Element,
    options?: MountOptions<HooksConfig>,
) => Promise<MountResult>;

export const testWithMountFixture = baseTest.extend<{
    mount: MountFixture;
}>({
    mount: async ({ mount: baseMount }, use) => {
        const wrapper: MountFixture = async (component, options) => {
            return await baseMount(
                <div
                    style={{ padding: 20, width: "fit-content", height: "fit-content" }}
                    className={ComponentWrapperClassName}
                >
                    {component}
                </div>,
                options,
            );
        };

        await use(wrapper);
    },
});
