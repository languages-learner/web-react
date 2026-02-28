import { createHrefTyped } from "@languages-learner/react-router-utils";
import { Outlet, useLocation } from "react-router";
import { BASE_INTERFACE_LOCALE } from "shared/project-config";
import type { InterfaceLocale } from "shared/project-config";
import type React from "react";

import { useUser } from "@/entities/user";
import { getLocaleFromPath } from "@/shared/react-router";
import { landingRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";

export const RequireLocaleMiddleware: React.FC = () => {
    const location = useLocation();
    const currentLocale = getLocaleFromPath();
    let neededLocale: InterfaceLocale = currentLocale ?? BASE_INTERFACE_LOCALE;

    const { isLoggedIn } = useAuth();
    const { user } = useUser();

    if (isLoggedIn && user) {
        neededLocale = user.interfaceLanguage as InterfaceLocale;
    }

    if (currentLocale !== neededLocale) {
        window.location.pathname = currentLocale
            ? location.pathname.replace(`/${currentLocale}`, `/${neededLocale}`)
            : createHrefTyped(landingRoutes.root, { locale: neededLocale });

        return null;
    }

    window.document.querySelector("html")?.setAttribute("lang", currentLocale);

    return <Outlet />;
};
