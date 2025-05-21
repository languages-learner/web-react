import React from "react";

import { useDataManager } from "@gravity-ui/data-source";
import { Select } from "@gravity-ui/uikit";
import { useMutation } from "@tanstack/react-query";

import { useUser, userDataSource } from "@/entities/user";
import { LANGUAGE_NAME, Language } from "@/shared/languages";
import { supabase } from "@/shared/services/api";

export const LearningLanguageSelector: React.FC = () => {
    const { user } = useUser();
    const dataManager = useDataManager();

    const { mutateAsync } = useMutation({
        mutationFn: async (activeLearningLanguage: string) => {
            if (!user) {
                return;
            }

            await supabase
                .from("user")
                .update({ active_learning_language: activeLearningLanguage })
                .eq("id", user.uid);
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
        <Select
            title="Sample select"
            label={"Learn"}
            onUpdate={(values) => updateActiveLearningLanguage(values[0])}
            value={[user.activeLearningLanguage]}
            size={"l"}
        >
            <Select.Option
                content={LANGUAGE_NAME[Language.En]}
                value={Language.En}
            />
            <Select.Option
                content={LANGUAGE_NAME[Language.Ru]}
                value={Language.Ru}
            />
        </Select>
    ) : null;
};
