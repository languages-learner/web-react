import { type To } from "react-router";

import { INTERFACE_LOCALES, type InterfaceLocale } from "@/shared/project-config";
import { createHrefTyped } from "@/shared/react-router/createHrefTyped";

export const getLocaleFromPath = (): InterfaceLocale | undefined => {
    const path = window.location.pathname;
    const [_, locale] = path.split("/");

    return locale && INTERFACE_LOCALES.includes(locale as InterfaceLocale)
        ? (locale as InterfaceLocale)
        : undefined;
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
