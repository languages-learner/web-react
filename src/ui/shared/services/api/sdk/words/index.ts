import {
    addWordTranslations,
    createWord,
    deleteWordTranslations,
    deleteWords,
    fetchWords,
    updateWordStatus,
} from "./words";

export const words = {
    fetchWords,
    updateWordStatus,
    addWordTranslations,
    createWord,
    deleteWordTranslations,
    deleteWords,
} as const;
