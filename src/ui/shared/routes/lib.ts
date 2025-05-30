import {
    type NavigateFunction,
    type NavigateOptions,
    type PathParam,
    type To,
    generatePath,
    useNavigate as useNavigateBase,
} from "react-router";

export const INTERFACE_LOCALES = ["en", "ru"] as const;
export type InterfaceLocale = (typeof INTERFACE_LOCALES)[number];

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return result;
};

export const getLocaleFromPath = (): InterfaceLocale | undefined => {
    const path = window.location.pathname;
    const [_, locale] = path.split("/");

    return locale && INTERFACE_LOCALES.includes(locale as InterfaceLocale)
        ? (locale as InterfaceLocale)
        : undefined;
};

export type PathParams<Path extends string, P = string> = { [K in PathParam<Path>]: P };

export function createHrefTyped<T extends string>(
    maybePath: T | { path: T },
    params: PathParams<T>,
) {
    const path = typeof maybePath === "string" ? maybePath : maybePath.path;

    const paramsEncoded = { ...params };

    for (const [key, val] of Object.entries<string>(paramsEncoded)) {
        paramsEncoded[key as keyof PathParams<T>] = encodeURIComponent(val);
    }

    return generatePath(path, paramsEncoded);
}

export const useNavigate = (): NavigateFunction => {
    const navigate = useNavigateBase();

    const navigateWithLocale: NavigateFunction = (to: To | number, options?: NavigateOptions) => {
        if (typeof to === "number") {
            return navigate(to);
        }

        let toWithLocale = to;
        if (typeof to === "string") {
            toWithLocale = createHrefTyped(to, { locale: getLocaleFromPath() });
        } else {
            toWithLocale = {
                ...to,
                pathname: to.pathname
                    ? createHrefTyped(to.pathname, { locale: getLocaleFromPath() })
                    : to.pathname,
            };
        }

        return navigate(toWithLocale, options);
    };

    return navigateWithLocale;
};
