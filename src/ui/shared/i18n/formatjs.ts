import { type ResolvedIntlConfig, createIntl, createIntlCache } from "react-intl";

import { getLocaleFromPath } from "@/shared/react-router";
import { type InterfaceLocale } from "shared/project-config";

// Ignoring if locales are not compiled during typecheck

// @ts-expect-error
import en from "locales/compiled/en.json";
// @ts-expect-error
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
