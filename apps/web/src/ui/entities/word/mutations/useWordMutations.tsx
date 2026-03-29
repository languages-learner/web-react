import { useDataManager } from "@gravity-ui/data-source";
import { useMutation } from "@tanstack/react-query";

import { wordsDataSource } from "../queries/words";
import type { components } from "@languages-learner/api";

import { sdk } from "@/shared/services/api";

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
        mutationFn: ({
            wordId,
            ...props
        }: { wordId: string } & components["schemas"]["AddWordTranslationsRequest"]) => {
            return sdk.words.addWordTranslations(wordId, props);
        },
        onSuccess: () => {
            dataManager.invalidateSource(wordsDataSource);
        },
    });

    const deleteWordTranslations = useMutation({
        mutationFn: ({
            wordId,
            ...props
        }: { wordId: string } & components["schemas"]["DeleteWordTranslationsRequest"]) => {
            return sdk.words.deleteWordTranslations(wordId, props);
        },
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
