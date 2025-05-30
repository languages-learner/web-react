import { type ResolvedIntlConfig, createIntl, createIntlCache } from "react-intl";

import { type InterfaceLocale, getLocaleFromPath } from "../routes";

import en from "locales/compiled/en.json";
import ru from "locales/compiled/ru.json";

const cache = createIntlCache();

const LOCALE_TO_MESSAGES: Record<InterfaceLocale, ResolvedIntlConfig["messages"]> = {
    en: en,
    ru: ru,
};

const createIntlWithLanguage = (locale: InterfaceLocale | undefined) => {
    return createIntl(
        {
            locale: locale ?? "en",
            messages: LOCALE_TO_MESSAGES[locale ?? "en"],
        },
        cache,
    );
};

export const intl = createIntlWithLanguage(getLocaleFromPath());
