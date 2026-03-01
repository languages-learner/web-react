import { createHrefTyped } from "./createHrefTyped";
import type { To } from "react-router";

export const patchToWithLocale = (to: To, locale: string): To => {
    if (typeof to === "string") {
        return createHrefTyped(to, { locale });
    }

    return {
        ...to,
        pathname: to.pathname ? createHrefTyped(to.pathname, { locale }) : to.pathname,
    };
};
