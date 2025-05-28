import {
    addWordTranslations,
    createWord,
    deleteWordTranslations,
    deleteWords,
    fetchWords,
    updateWordsStatus,
} from "./words";

export const words = {
    fetchWords,
    updateWordsStatus,
    addWordTranslations,
    createWord,
    deleteWordTranslations,
    deleteWords,
} as const;
