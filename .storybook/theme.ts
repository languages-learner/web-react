import { create } from "@storybook/theming";

export const CloudThemeLight = create({
    base: "light",
});

export const CloudThemeDark = create({
    base: "dark",
});

export const themes = {
    light: CloudThemeLight,
    dark: CloudThemeDark,
};
