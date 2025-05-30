import React from "react";

import { Select, type SelectProps } from "@gravity-ui/uikit";

import {
    LANGUAGE_NAME,
    type Language,
    getFullLanguageName,
    getShortLanguageName,
} from "@/shared/languages";

export interface LanguageSelectorProps extends Omit<SelectProps, "options"> {
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
        <Select<Language> {...selectProps}>
            {languages.map((language) => (
                <Select.Option key={language} value={language}>
                    {getLanguageName(language as Language)}
                </Select.Option>
            ))}
        </Select>
    );
};
