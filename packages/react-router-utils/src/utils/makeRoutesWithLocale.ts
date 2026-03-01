export type RouteObject = Record<string, string>;

export type RouteObjectWithLocales<T extends RouteObject> = {
    [Key in keyof T]: `/:locale${T[Key]}`;
};

export const makeRoutesWithLocale = <T extends RouteObject>(
    routes: T,
): RouteObjectWithLocales<T> => {
    const result = Object.fromEntries(
        Object.entries(routes).map(([key, value]) => [key, `/:locale${value}`]),
    );

    // @ts-expect-error
    return result;
};
