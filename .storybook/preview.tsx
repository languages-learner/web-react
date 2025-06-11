import { DocsDecorator } from "./decorators/DocsDecorator";
import { WithTheme } from "./decorators/withTheme";
import { themes } from "./theme";

import type { Preview } from "@storybook/react-vite";

import "../src/ui/app/styles/gravity-imports.scss";
import "../src/ui/app/styles/gravity-theme.scss";
import "../src/ui/app/styles/reset.scss";

const preview: Preview = {
    parameters: {
        docs: {
            theme: themes.light,
            container: DocsDecorator,
            codePanel: true,
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo",
        },
        jsx: { showFunctions: true },
    },
    decorators: [WithTheme],
    globalTypes: {
        theme: {
            defaultValue: "light",
            toolbar: {
                title: "Theme",
                icon: "mirror",
                items: [
                    { value: "light", right: "☼", title: "Light" },
                    { value: "dark", right: "☾", title: "Dark" },
                ],
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
