import { patchToWithLocale } from "@languages-learner/react-router-utils";
import { useNavigate as useNavigateBase } from "react-router";
import { BASE_INTERFACE_LOCALE } from "shared/project-config";

import { getLocaleFromPath } from "./locale";
import type { NavigateFunction, NavigateOptions, To } from "react-router";

export const useNavigate = (): NavigateFunction => {
    const navigate = useNavigateBase();

    const navigateWithLocale: NavigateFunction = (to: To | number, options?: NavigateOptions) => {
        if (typeof to === "number") {
            return navigate(to);
        }

        const locale = getLocaleFromPath();

        return navigate(patchToWithLocale(to, locale ?? BASE_INTERFACE_LOCALE), options);
    };

    return navigateWithLocale;
};
