// oxlint-disable-next-line no-restricted-imports
import { type NavigateFunction, type NavigateOptions, type To, useNavigate } from "react-router";

import { BASE_INTERFACE_LOCALE } from "shared/project-config";

import { getLocaleFromPath, patchToWithLocale } from "./locale";

export const useNavigateA = (): NavigateFunction => {
    const navigate = useNavigate();

    const navigateWithLocale: NavigateFunction = (to: To | number, options?: NavigateOptions) => {
        if (typeof to === "number") {
            return navigate(to);
        }

        const locale = getLocaleFromPath();

        return navigate(patchToWithLocale(to, locale ?? BASE_INTERFACE_LOCALE), options);
    };

    return navigateWithLocale;
};
