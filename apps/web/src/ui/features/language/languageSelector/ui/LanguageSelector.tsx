import React from "react";

import { Select, SelectItem } from "@heroui/select";
import { classNames } from "@languages-learner/class-names";
import type { SelectProps } from "@heroui/select";

import type { Language } from "@/shared/languages";
import { LANGUAGE_NAME, getFullLanguageName, getShortLanguageName } from "@/shared/languages";

export interface LanguageSelectorProps extends Omit<SelectProps, "children"> {
    fullName?: boolean;
    languages?: ReadonlyArray<string>;
    overrideLanguageName?: (language: Language) => string | null;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    fullName,
    languages = Object.keys(LANGUAGE_NAME),
    overrideLanguageName,
    ...selectProps
}) => {
    const getLanguageName = (language: Language) => {
        const overriddenName = overrideLanguageName?.(language);
        if (overriddenName) {
            return overriddenName;
        }

        return fullName ? getFullLanguageName(language) : getShortLanguageName(language);
    };

    return (
        <Select
            variant="bordered"
            {...selectProps}
            classNames={{
                ...selectProps.classNames,
                popoverContent: classNames(
                    selectProps.classNames?.popoverContent,
                    fullName ? "min-w-[200px]" : "min-w-[150px]",
                ),
                trigger: classNames(selectProps.classNames?.trigger, "cursor-pointer"),
            }}
        >
            {languages.map((language) => (
                <SelectItem key={language}>{getLanguageName(language as Language)}</SelectItem>
            ))}
        </Select>
    );
};
