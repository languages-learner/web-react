import type React from "react";

import { Outlet, useLocation } from "react-router";

import { useUser } from "@/entities/user";
import { type InterfaceLocale } from "@/shared/project-config";
import { createHrefTyped, getLocaleFromPath } from "@/shared/react-router";
import { landingRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";

export const RequireLocaleMiddleware: React.FC = () => {
    const location = useLocation();
    const currentLocale = getLocaleFromPath();
    let neededLocale: InterfaceLocale = "en";

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

    return <Outlet />;
};
