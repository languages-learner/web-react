import type * as React from "react";

import { ThemeProvider, getThemeType } from "@gravity-ui/uikit";
import { DocsContainer } from "@storybook/addon-docs";

import { themes } from "../theme";

import type { DocsContainerProps } from "@storybook/addon-docs";

export type DocsDecoratorProps = React.PropsWithChildren<DocsContainerProps>;

export function DocsDecorator({ children, context }: DocsDecoratorProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { theme } = context.store.userGlobals.globals;

    return (
        <div>
            <DocsContainer context={context} theme={themes[getThemeType(theme)]}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </DocsContainer>
        </div>
    );
}
