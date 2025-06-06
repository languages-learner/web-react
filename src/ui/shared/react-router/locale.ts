import { type To } from "react-router";

import {
    BASE_INTERFACE_LOCALE,
    INTERFACE_LOCALES,
    type InterfaceLocale,
} from "@/shared/project-config";
import { createHrefTyped } from "@/shared/react-router/createHrefTyped";

export const getLocaleFromPath = (): InterfaceLocale | undefined => {
    const path = window.location.pathname;
    const [_, locale] = path.split("/");

    return locale && INTERFACE_LOCALES.includes(locale as InterfaceLocale)
        ? (locale as InterfaceLocale)
        : undefined;
};

export const getLocaleFromPathSafe = (): InterfaceLocale => {
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
