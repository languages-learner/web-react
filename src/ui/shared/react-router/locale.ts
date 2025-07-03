import { type To } from "react-router";

import { getLocaleFromPath as baseGetLocaleFromPath } from "shared/locale";
import { BASE_INTERFACE_LOCALE, type InterfaceLocale } from "shared/project-config";

import { createHrefTyped } from "./createHrefTyped";

export const getLocaleFromPath = (): InterfaceLocale | undefined => {
    const path = window.location.pathname;

    return baseGetLocaleFromPath(path);
};

export const getLocaleFromPathSafe = (): InterfaceLocale => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return getLocaleFromPath()!;
};

export const patchToWithLocale = (to: To, locale: string): To => {
    if (typeof to === "string") {
        return createHrefTyped(to, { locale });
    }

    return {
        ...to,
        pathname: to.pathname ? createHrefTyped(to.pathname, { locale }) : to.pathname,
    };
};

export const getPathWithLocale = (path: string, locale: string): string => {
    return patchToWithLocale(path, locale ?? BASE_INTERFACE_LOCALE) as string;
};

export const getPathWithCurrentLocale = (path: string): string => {
    const locale = getLocaleFromPath();

    return getPathWithLocale(path, locale ?? BASE_INTERFACE_LOCALE);
};
