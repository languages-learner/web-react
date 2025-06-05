import { type MountFixture, type PlaywrightFixture } from "./types";

import { ComponentWrapperClassName } from "@/tests/component/core/constants";

export const mountFixture: PlaywrightFixture<MountFixture> = async ({ mount: baseMount }, use) => {
    const mount: MountFixture = async (component, options) => {
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(mount);
};
