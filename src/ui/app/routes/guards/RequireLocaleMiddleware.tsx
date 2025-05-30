import type React from "react";

import { Navigate, Outlet, useLocation } from "react-router";

import { useUser } from "@/entities/user";
import { type InterfaceLocale } from "@/shared/project-config";
import { createHrefTyped, getLocaleFromPath } from "@/shared/react-router";
import { landingRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";

export const RequireLocaleMiddleware: React.FC = () => {
    // const matches = useMatches();
    const location = useLocation();
    const currentLocale = getLocaleFromPath();
    // console.log(matches, location, "matches");
    let neededLocale: InterfaceLocale = "en";
    // console.log(currentLocale, "currentLocale");

    const { isLoggedIn } = useAuth();
    const { user } = useUser();

    if (isLoggedIn && user) {
        neededLocale = user.interfaceLanguage as InterfaceLocale;
    }

    if (currentLocale !== neededLocale) {
        const path = currentLocale
            ? location.pathname.replace(`/${currentLocale}`, `/${neededLocale}`)
            : createHrefTyped(landingRoutes.root, { locale: neededLocale });

        window.location.pathname = path;

        return <Navigate to={landingRoutes.root} />;
    }

    return <Outlet />;
};
