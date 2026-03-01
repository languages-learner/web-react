import { HeroUIProvider } from "@heroui/system";
import { themes } from "@storybook/theming";

import type { Preview } from "@storybook/react-vite";

import "./style.css";

const commonTheme = {
    brandTitle: "LanguagesLearner UI",
    brandUrl: "https://github.com/languages-learner/web-react",
    brandTarget: "_self",
};

const preview: Preview = {
    parameters: {
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
        darkMode: {
            current: "dark",
            stylePreview: true,
            darkClass: "dark",
            lightClass: "light",
            classTarget: "html",
            dark: {
                ...themes.dark,
                ...commonTheme,
            },
            light: {
                ...themes.light,
                ...commonTheme,
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <HeroUIProvider>
                    <Story />
                </HeroUIProvider>
            );
        },
    ],
};

export default preview;
