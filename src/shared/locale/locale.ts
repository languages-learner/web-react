import { INTERFACE_LOCALES, type InterfaceLocale } from "../project-config";

// path - /en/example/path
export const getLocaleFromPath = (path: string): InterfaceLocale | undefined => {
    const [_, locale] = path.split("/");

    return locale && INTERFACE_LOCALES.includes(locale as InterfaceLocale)
        ? (locale as InterfaceLocale)
        : undefined;
};

export const getLocaleFromPathSafe = (path: string): InterfaceLocale => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return getLocaleFromPath(path)!;
};
