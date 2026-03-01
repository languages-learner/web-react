import React from "react";

import { CardContent, withToasts } from "@languages-learner/uikit";

import type { WordFormType } from "@/features/words/createWordForm";
import { useUserSafe } from "@/entities/user";
import { useWordMutations } from "@/entities/word";
import { CreateWordForm } from "@/features/words/createWordForm";
import { intl } from "@/shared/i18n";

export interface CreateWordCardProps {
    className?: string;
    onClose: () => unknown;
    onSubmit: () => unknown;
    sourceWord?: string;
}

export const CreateWordCard: React.FC<CreateWordCardProps> = ({
    className,
    onClose,
    onSubmit,
    sourceWord,
}) => {
    const [initSourceWord] = React.useState(sourceWord);
    const { user } = useUserSafe();
    const { createWord } = useWordMutations();
    const handleCreateWord = async (values: WordFormType) => {
        await withToasts(
            createWord.mutateAsync({
                word: values.source,
                translations: values.translations
                    .filter((translation) => translation.text)
                    .map((translation) => ({
                        text: translation.text,
                        language: user.nativeLanguage,
                    })),
            }),
            {
                success: intl.formatMessage({
                    defaultMessage: "Word successfully added!",
                    id: "OEgSz2",
                }),
                error: intl.formatMessage({
                    defaultMessage: "Error",
                    id: "KN7zKn",
                }),
            },
        );

        onSubmit();
    };

    const baseTranslation: WordFormType["translations"][number] = React.useMemo(
        () => ({
            text: "",
            language: user.nativeLanguage,
        }),
        [user.nativeLanguage],
    );

    const initialValues = React.useMemo<WordFormType>(
        () => ({
            source: {
                text: initSourceWord ?? "",
                language: user.activeLearningLanguage,
            },
            translations: [],
        }),
        [initSourceWord, user.activeLearningLanguage],
    );

    return (
        <CardContent
            title={intl.formatMessage({
                defaultMessage: "Add new word",
                id: "fXelj0",
            })}
            closable
            onClose={onClose}
            className={className}
        >
            <CreateWordForm
                onSubmit={async (values, form) => {
                    await handleCreateWord(values);
                    form.restart();
                }}
                initialValues={initialValues}
                baseTranslation={baseTranslation}
            />
        </CardContent>
    );
};
