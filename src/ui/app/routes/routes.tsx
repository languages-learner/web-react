import { type RouteObject } from "react-router";

import { LandingPage } from "@/pages/landing";
import { WorkspaceDictionaryPage } from "@/pages/workspace/dictionary";
import { landingRoutes, workspaceRoutes } from "@/shared/routes";

import { RequireAuthMiddleware } from "./guards/RequireAuthMiddleware";

export const routes: RouteObject[] = [
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
];
