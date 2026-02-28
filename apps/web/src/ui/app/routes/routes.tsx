import { Navigate } from "react-router";

import { RequireAuthMiddleware } from "./guards/RequireAuthMiddleware";
import { RequireLocaleMiddleware } from "./guards/RequireLocaleMiddleware";
import type { RouteObject } from "react-router";

import { LandingPage } from "@/pages/landing/landingPage";
import { WorkspaceDictionaryPage } from "@/pages/workspace/dictionary";
import { OfficeProfilePage } from "@/pages/workspace/office/profile";
import { OfficeSettingsPage } from "@/pages/workspace/office/settings";
import { landingRoutes, officeRoutes, workspaceRoutes } from "@/shared/routes";

export const routes: RouteObject[] = [
    {
        id: "app",
        path: "",
        element: <RequireLocaleMiddleware />,
        children: [
            {
                id: "landing",
                path: landingRoutes.root,
                element: <LandingPage />,
            },
            {
                id: "workspace",
                path: workspaceRoutes.root,
                element: <RequireAuthMiddleware />,
                children: [
                    {
                        id: "workspace-dictionary",
                        path: workspaceRoutes.dictionary,
                        element: <WorkspaceDictionaryPage />,
                    },
                ],
            },
            {
                id: "office",
                path: officeRoutes.root,
                element: <RequireAuthMiddleware />,
                children: [
                    {
                        id: "office-settings",
                        path: officeRoutes.settings,
                        element: <OfficeSettingsPage />,
                    },
                    {
                        id: "office-profile",
                        path: officeRoutes.profile,
                        element: <OfficeProfilePage />,
                    },
                ],
            },
        ],
    },
    {
        id: "other",
        path: "*",
        element: <Navigate to={landingRoutes.root} />,
    },
];
