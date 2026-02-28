import type { I18nConfig } from "./types";

export const getProjectI18nConfig = (): I18nConfig | null => {
    return {
        localesDirPath: "src/locales",
        extractedFilePath: "src/locales/extracted.json",
        compiledTranslationsDirPath: "src/locales/compiled",
        languages: ["en", "ru"],
        defaultLanguage: "en",
    };
};
