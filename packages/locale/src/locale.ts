export interface GetLocaleFromPathProps {
    path: string;
    availableLocales?: string[] | Readonly<string[]>;
}

// path - /en/example/path
export const getLocaleFromPath = ({ path, availableLocales }: GetLocaleFromPathProps) => {
    const [_, locale] = path.split("/");

    return locale && (!availableLocales || availableLocales.includes(locale)) ? locale : undefined;
};

export const getLocaleFromPathSafe = (props: GetLocaleFromPathProps) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return getLocaleFromPath(props)!;
};
