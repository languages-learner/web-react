import { getLocaleFromPath as baseGetLocaleFromPath } from "@languages-learner/locale";
import { patchToWithLocale } from "@languages-learner/react-router-utils";
import { BASE_INTERFACE_LOCALE, INTERFACE_LOCALES } from "shared/project-config";
import type { InterfaceLocale } from "shared/project-config";

export const getLocaleFromPath = (): InterfaceLocale | undefined => {
    const path = window.location.pathname;

    return baseGetLocaleFromPath({ path, availableLocales: INTERFACE_LOCALES }) as
        | InterfaceLocale
        | undefined;
};

export const getLocaleFromPathSafe = (): InterfaceLocale => {
    return getLocaleFromPath()!;
};

export const getPathWithLocale = (path: string, locale: string): string => {
    return patchToWithLocale(path, locale) as string;
};

export const getPathWithCurrentLocale = (path: string): string => {
    const locale = getLocaleFromPath();

    return getPathWithLocale(path, locale ?? BASE_INTERFACE_LOCALE);
};
