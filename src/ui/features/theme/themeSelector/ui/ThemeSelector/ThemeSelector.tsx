import React from "react";

import { Select, SelectItem, type SelectProps } from "@heroui/select";

import { classNames } from "@/shared/class-names";
import { ApiConstants } from "shared/services/api";

import { THEME_NAME } from "./constants";

export type ThemeSelectorProps = Omit<SelectProps, "children">;

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ ...selectProps }) => {
    return (
        <Select
            variant="bordered"
            {...selectProps}
            classNames={{
                ...selectProps.classNames,
                trigger: classNames(selectProps.classNames?.trigger, "cursor-pointer"),
            }}
        >
            {ApiConstants.public.Enums.Theme.map((theme) => (
                <SelectItem key={theme}>{THEME_NAME[theme]}</SelectItem>
            ))}
        </Select>
    );
};
