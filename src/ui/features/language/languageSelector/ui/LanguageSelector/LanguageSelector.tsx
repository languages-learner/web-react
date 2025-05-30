import React from "react";

import { Select, type SelectProps } from "@gravity-ui/uikit";

import { LANGUAGE_NAME, type Language } from "@/shared/languages";

export type LanguageSelectorProps = Omit<SelectProps, "options">;

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ ...selectProps }) => {
    return (
        // TODO
        <Select<Language> value={["ru"]} {...selectProps}>
            {Object.keys(LANGUAGE_NAME).map((language) => {
                return (
                    <Select.Option key={language} value={language}>
                        {language.toUpperCase()}
                    </Select.Option>
                );
            })}
        </Select>
    );
};
