import { useDataManager } from "@gravity-ui/data-source";
import { useMutation } from "@tanstack/react-query";

import { wordsDataSource } from "@/entities/word";
import { sdk } from "@/shared/services/api";

export const useWordMutations = () => {
    const dataManager = useDataManager();

    const updateWordStatus = useMutation({
        mutationFn: sdk.words.updateWordStatus,
        onSuccess: () => {
            dataManager.invalidateSource(wordsDataSource);
        },
    });

    const createWord = useMutation({
        mutationFn: sdk.words.createWord,
        onSuccess: () => {
            dataManager.invalidateSource(wordsDataSource);
        },
    });

    const deleteWords = useMutation({
        mutationFn: sdk.words.deleteWords,
        onSuccess: () => {
            dataManager.invalidateSource(wordsDataSource);
        },
    });

    const addWordTranslations = useMutation({
        mutationFn: sdk.words.addWordTranslations,
        onSuccess: () => {
            dataManager.invalidateSource(wordsDataSource);
        },
    });

    const deleteWordTranslations = useMutation({
        mutationFn: sdk.words.deleteWordTranslations,
        onSuccess: () => {
            dataManager.invalidateSource(wordsDataSource);
        },
    });

    return {
        updateWordStatus,
        createWord,
        deleteWords,
        addWordTranslations,
        deleteWordTranslations,
    };
};
