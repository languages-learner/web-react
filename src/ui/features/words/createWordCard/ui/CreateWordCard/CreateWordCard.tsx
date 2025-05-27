import React from "react";

import { useUserSafe } from "@/entities/user";
import { useWordMutations } from "@/entities/word";
import { CreateWordForm, type WordFormType } from "@/features/words/createWordForm";
import { CardContent, withToasts } from "@/shared/ui";

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
        const result = await withToasts(
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
                name: "create-word",
                success: "Word successfully added!",
                error: "Error",
            },
        );

        if (result) {
            onSubmit();
        }
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
        <CardContent title={"Add new word"} closable onClose={onClose} className={className}>
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
