import React from "react";

import { useDataManager } from "@gravity-ui/data-source";
import { Select } from "@gravity-ui/uikit";
import { useMutation } from "@tanstack/react-query";

import { useUser, userDataSource } from "@/entities/user";
import { intl } from "@/shared/i18n";
import { LANGUAGE_NAME, type Language } from "@/shared/languages";
import { sdk } from "@/shared/services/api";

export const LearningLanguageSelector: React.FC = () => {
    const { user } = useUser();
    const dataManager = useDataManager();

    const { mutateAsync } = useMutation({
        mutationFn: async (activeLearningLanguage: string) => {
            if (!user) {
                return;
            }

            await sdk.user.updateUser({
                userId: user.uid,
                payload: {
                    active_learning_language: activeLearningLanguage,
                },
            });
        },
        onSuccess: () => {
            dataManager.invalidateSource(userDataSource);
        },
    });

    const updateActiveLearningLanguage = React.useCallback(
        async (activeLearningLanguage: string) => {
            try {
                await mutateAsync(activeLearningLanguage);
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e, "error");
            }
        },
        [mutateAsync],
    );

    return user ? (
        <Select<Language>
            title="Sample select"
            label={intl.formatMessage({
                defaultMessage: "Learn",
                id: "IbrSk1",
            })}
            onUpdate={(values) => updateActiveLearningLanguage(values[0])}
            value={[user.activeLearningLanguage as Language]}
            size={"l"}
            filterable
        >
            {Object.entries(LANGUAGE_NAME).map(([language, name]) => {
                return <Select.Option key={language} content={name} value={language} />;
            })}
        </Select>
    ) : null;
};
