import { Navigate, Outlet } from "react-router";
import type React from "react";

import { useUser } from "@/entities/user";
import { landingRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";

export const RequireAuthMiddleware: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const { user } = useUser();
    if (!isLoggedIn) {
        return <Navigate to={landingRoutes.root} />;
    }

    return user ? <Outlet /> : null;
};
