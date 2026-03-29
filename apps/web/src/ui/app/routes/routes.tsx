import { Navigate } from "react-router";

import { RequireAuthMiddleware } from "./guards/RequireAuthMiddleware";
import { RequireLocaleMiddleware } from "./guards/RequireLocaleMiddleware";
import type { RouteObject } from "react-router";

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
                lazy: () =>
                    import("@/pages/landing/landingPage").then((m) => ({
                        Component: m.LandingPage,
                    })),
            },
            {
                id: "workspace",
                path: workspaceRoutes.root,
                element: <RequireAuthMiddleware />,
                children: [
                    {
                        id: "workspace-dictionary",
                        path: workspaceRoutes.dictionary,
                        lazy: () =>
                            import("@/pages/workspace/dictionary").then((m) => ({
                                Component: m.WorkspaceDictionaryPage,
                            })),
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
                        lazy: () =>
                            import("@/pages/workspace/office/settings").then((m) => ({
                                Component: m.OfficeSettingsPage,
                            })),
                    },
                    {
                        id: "office-profile",
                        path: officeRoutes.profile,
                        lazy: () =>
                            import("@/pages/workspace/office/profile").then((m) => ({
                                Component: m.OfficeProfilePage,
                            })),
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
