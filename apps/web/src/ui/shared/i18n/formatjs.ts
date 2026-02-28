import { createIntl, createIntlCache } from "react-intl";
import en from "locales/compiled/en.json";
import ru from "locales/compiled/ru.json";
import type { ResolvedIntlConfig } from "react-intl";
import type { InterfaceLocale } from "shared/project-config";

// Ignoring if locales are not compiled during typecheck

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { getLocaleFromPath } from "@/shared/react-router";

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
