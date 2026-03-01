import React from "react";

import { Select, SelectItem } from "@heroui/select";
import { ApiConstants } from "@languages-learner/api";
import { classNames } from "@languages-learner/class-names";

import { THEME_NAME } from "./constants";
import type { SelectProps } from "@heroui/select";

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
