import React from "react";

import { Select, type SelectProps } from "@gravity-ui/uikit";

import { ApiConstants, type ApiDatabase } from "@/shared/services/api";

import { THEME_NAME } from "./constants";

export type ThemeSelectorProps = Omit<SelectProps, "options">;

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ ...selectProps }) => {
    return (
        <Select<ApiDatabase["public"]["Enums"]["Theme"]> {...selectProps}>
            {ApiConstants.public.Enums.Theme.map((theme) => (
                <Select.Option key={theme} value={theme}>
                    {THEME_NAME[theme]}
                </Select.Option>
            ))}
        </Select>
    );
};
