import { Navigate, type RouteObject } from "react-router";

import { LandingPage } from "@/pages/landing/landingPage";
import { WorkspaceDictionaryPage } from "@/pages/workspace/dictionary";
import { landingRoutes, workspaceRoutes } from "@/shared/routes";

import { RequireAuthMiddleware } from "./guards/RequireAuthMiddleware";
import { RequireLocaleMiddleware } from "./guards/RequireLocaleMiddleware";

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
        ],
    },
    {
        id: "other",
        path: "*",
        element: <Navigate to={landingRoutes.root} />,
    },
];
