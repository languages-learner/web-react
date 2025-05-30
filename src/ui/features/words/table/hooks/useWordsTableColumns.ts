import React from "react";

import { type ColumnDef } from "@gravity-ui/table/tanstack";

import { useUserSafe } from "@/entities/user";
import { useWordMutations, wordColumns } from "@/entities/word";
import { intl } from "@/shared/i18n";
import { withToasts } from "@/shared/ui";

import type { WordWithTranslations } from "@/shared/services/api";

export const useWordsTableColumns = () => {
    const [editingWords, setEditingWords] = React.useState(new Set<string>());

    const { user } = useUserSafe();
    const { updateWordsStatus, addWordTranslations, deleteWordTranslations, deleteWords } =
        useWordMutations();

    const wordsTableColumns = React.useMemo<ColumnDef<WordWithTranslations>[]>(() => {
        return [
            wordColumns.selection,
            wordColumns.textAndTranslationWithEdit({
                editView: (item) => editingWords.has(item.id),
                onAddWord: ({ item, translation }) =>
                    withToasts(
                        addWordTranslations.mutateAsync({
                            wordId: item.id,
                            translations: [translation],
                        }),
                        {
                            name: "wordsTableAddWord",
                            success: intl.formatMessage({
                                defaultMessage: "Word successfully added!",
                            }),
                            error: intl.formatMessage({
                                defaultMessage: "Error adding word",
                            }),
                        },
                    ),
                baseTranslationLanguage: user.nativeLanguage,
                onDeleteTranslation: ({ item, translationId }) =>
                    withToasts(
                        deleteWordTranslations.mutateAsync({
                            wordId: item.id,
                            translationsIds: [translationId],
                        }),
                        {
                            name: "wordsTableDeleteWordTranslations",
                            success: intl.formatMessage({
                                defaultMessage: "Word translation successfully deleted!",
                            }),
                            error: intl.formatMessage({
                                defaultMessage: "Error deleting word translation",
                            }),
                        },
                    ),
            }),
            wordColumns.status({
                onUpdate: ({ item, status }) =>
                    withToasts(
                        updateWordsStatus.mutateAsync({
                            wordsIds: [item.id],
                            status,
                        }),
                        {
                            name: "words-table-update-word-status",
                            success: intl.formatMessage({
                                defaultMessage: "Status successfully updated!",
                            }),
                            error: intl.formatMessage({
                                defaultMessage: "Error updating status",
                            }),
                        },
                    ),
            }),
            wordColumns.edit({
                editView: (item) => editingWords.has(item.id),
                onEditClick: ({ item }) => {
                    if (editingWords.has(item.id)) {
                        setEditingWords((prev) => {
                            const result = new Set(prev);
                            result.delete(item.id);

                            return result;
                        });
                    } else {
                        setEditingWords((prev) => new Set(prev).add(item.id));
                    }
                },
            }),
            wordColumns.delete({
                onDelete: ({ item }) => {
                    return withToasts(deleteWords.mutateAsync({ wordIds: [item.id] }), {
                        name: "wordsTableDeleteWord",
                        success: intl.formatMessage({
                            defaultMessage: "Word successfully deleted!",
                        }),
                        error: intl.formatMessage({
                            defaultMessage: "Error deleting word",
                        }),
                    });
                },
            }),
        ];
    }, [
        addWordTranslations,
        deleteWordTranslations,
        deleteWords,
        editingWords,
        updateWordsStatus,
        user.nativeLanguage,
    ]);

    return {
        wordsTableColumns,
    };
};
