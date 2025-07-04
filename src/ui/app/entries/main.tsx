import React from "react";

import { DataManagerContext } from "@gravity-ui/data-source";
import { ThemeProvider } from "@gravity-ui/uikit";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RawIntlProvider } from "react-intl";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { UserProvider } from "@/entities/user";
import { dataManager } from "@/shared/data-source";
import { intl } from "@/shared/i18n";
import { SupabaseAuthProvider } from "@/shared/services/auth";
import { getThemeQuery } from "@/shared/theme";
import { ToasterProvider } from "@/shared/ui";
import { BASE_THEME } from "shared/project-config";

import { routes } from "../routes";

import "@/app/styles/gravity-imports.css";
import "@/app/styles/gravity-theme.css";
import "@/app/styles/reset.css";

const bootstrap = () => {
    const themeFromQuery = getThemeQuery();

    const router = createBrowserRouter([
        {
            id: "main",
            path: "/",
            element: <Outlet />,
            // errorElement: <div>TODO: ERROR</div>,
            children: routes,
        },
    ]);

    // oxlint-disable-next-line no-non-null-assertion
    createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <RawIntlProvider value={intl}>
                <DataManagerContext.Provider value={dataManager}>
                    <QueryClientProvider client={dataManager.queryClient}>
                        <SupabaseAuthProvider>
                            <UserProvider>
                                {({ user }) => (
                                    <ThemeProvider
                                        theme={user?.theme ?? themeFromQuery ?? BASE_THEME}
                                    >
                                        <ToasterProvider>
                                            <RouterProvider router={router} />
                                        </ToasterProvider>
                                    </ThemeProvider>
                                )}
                            </UserProvider>
                        </SupabaseAuthProvider>
                    </QueryClientProvider>
                </DataManagerContext.Provider>
            </RawIntlProvider>
        </React.StrictMode>,
    );
};

bootstrap();
