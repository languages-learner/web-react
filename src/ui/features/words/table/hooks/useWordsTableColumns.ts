import React from "react";

import { type ColumnDef } from "@tanstack/react-table";

import { useUserSafe } from "@/entities/user";
import { useWordMutations, wordColumns } from "@/entities/word";
import { intl } from "@/shared/i18n";
import { withToasts } from "@/shared/ui";

import type { WordWithTranslations } from "shared/services/api";

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
                            success: intl.formatMessage({
                                defaultMessage: "Word successfully added!",
                                id: "OEgSz2",
                            }),
                            error: intl.formatMessage({
                                defaultMessage: "Error adding word",
                                id: "yn0wCl",
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
                            success: intl.formatMessage({
                                defaultMessage: "Word translation successfully deleted!",
                                id: "Sq5NhR",
                            }),
                            error: intl.formatMessage({
                                defaultMessage: "Error deleting word translation",
                                id: "H9zLLp",
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
                            success: intl.formatMessage({
                                defaultMessage: "Status successfully updated!",
                                id: "WnQWEt",
                            }),
                            error: intl.formatMessage({
                                defaultMessage: "Error updating status",
                                id: "j58r0o",
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
                        success: intl.formatMessage({
                            defaultMessage: "Word successfully deleted!",
                            id: "u/yYaU",
                        }),
                        error: intl.formatMessage({
                            defaultMessage: "Error deleting word",
                            id: "u8Bo1E",
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
