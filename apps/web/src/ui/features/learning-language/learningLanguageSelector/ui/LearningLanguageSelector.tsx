import React from "react";

import { withToasts } from "@languages-learner/uikit";

import type { LanguageSelectorProps } from "@/features/language/languageSelector";
import type { Language } from "@/shared/languages";
import { useUserMutations, useUserSafe } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { intl } from "@/shared/i18n";

export type LearningLanguageSelectorProps = Omit<
    LanguageSelectorProps,
    "onSelectionChange" | "selectedKeys"
>;

export const LearningLanguageSelector: React.FC<LearningLanguageSelectorProps> = ({
    ...selectProps
}) => {
    const { user } = useUserSafe();
    const { updateUser } = useUserMutations();

    const updateActiveLearningLanguage = React.useCallback(
        (value: string) => {
            withToasts(
                updateUser.mutateAsync({
                    userId: user.uid,
                    payload: {
                        active_learning_language: value,
                    },
                }),
                {
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
            isVirtualized
            disallowEmptySelection
            onSelectionChange={(value) => {
                if (value.currentKey) {
                    updateActiveLearningLanguage(value.currentKey);
                }
            }}
            selectedKeys={[user.activeLearningLanguage as Language]}
            {...selectProps}
        />
    );
};
