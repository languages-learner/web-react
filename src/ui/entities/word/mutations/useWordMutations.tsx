import { useDataManager } from "@gravity-ui/data-source";
import { useMutation } from "@tanstack/react-query";

import { sdk } from "@/shared/services/api";

import { wordsDataSource } from "../queries/words";

export const useWordMutations = () => {
    const dataManager = useDataManager();

    const updateWordsStatus = useMutation({
        mutationFn: sdk.words.updateWordsStatus,
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
        updateWordsStatus,
        createWord,
        deleteWords,
        addWordTranslations,
        deleteWordTranslations,
    };
};
