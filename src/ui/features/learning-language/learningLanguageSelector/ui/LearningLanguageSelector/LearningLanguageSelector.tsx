import React from "react";

import { Select } from "@gravity-ui/uikit";

import { useUserMutations, useUserSafe } from "@/entities/user";
import { LanguageSelector, type LanguageSelectorProps } from "@/features/language/languageSelector";
import { intl } from "@/shared/i18n";
import { LANGUAGE_NAME, type Language } from "@/shared/languages";
import { withToasts } from "@/shared/ui";

export type LearningLanguageSelectorProps = Omit<LanguageSelectorProps, "onUpdate" | "value">;

export const LearningLanguageSelector: React.FC<LearningLanguageSelectorProps> = ({
    ...selectProps
}) => {
    const { user } = useUserSafe();
    const { updateUser } = useUserMutations();

    const updateActiveLearningLanguage = React.useCallback(
        async (value: string) => {
            withToasts(
                updateUser.mutateAsync({
                    userId: user.uid,
                    payload: {
                        active_learning_language: value,
                    },
                }),
                {
                    name: "updateActiveLearningLanguage",
                    success: intl.formatMessage({
                        defaultMessage: "User active learning language successfully updated!",
                        id: "t/MnRq",
                    }),
                    error: intl.formatMessage({
                        defaultMessage: "Error updating user active learning language",
                        id: "9J9Rj9",
                    }),
                },
            );
        },
        [updateUser, user.uid],
    );

    return (
        <LanguageSelector
            onUpdate={([value]) => updateActiveLearningLanguage(value)}
            value={[user.activeLearningLanguage as Language]}
            {...selectProps}
        >
            {Object.entries(LANGUAGE_NAME).map(([language, name]) => {
                return <Select.Option key={language} content={name} value={language} />;
            })}
        </LanguageSelector>
    );
};
