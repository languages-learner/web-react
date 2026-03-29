import React from "react";

import { DataManagerContext } from "@gravity-ui/data-source";
import { HeroUIProvider } from "@heroui/system";
import { dataManager } from "@languages-learner/data-source";
import { ToasterProvider } from "@languages-learner/uikit";
import { QueryNormalizerProvider } from "@normy/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RawIntlProvider } from "react-intl";
import { Outlet, createBrowserRouter } from "react-router";

import { routes } from "../routes";
import { AppErrorBoundary, RouteErrorFallback } from "./errorFallback";
import { RouterProviderWithSuspense } from "./router";

import { UserProvider } from "@/entities/user";
import { intl } from "@/shared/i18n";
import { SupabaseAuthProvider } from "@/shared/services/auth";
import { ThemeProvider, getThemeQuery } from "@/shared/theme";

import "@/app/styles/main.css";
import "@/app/styles/reset.css";

const bootstrap = () => {
    const themeFromQuery = getThemeQuery();

    const router = createBrowserRouter([
        {
            id: "main",
            path: "/",
            element: <Outlet />,
            errorElement: <RouteErrorFallback />,
            children: routes,
        },
    ]);

    createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <HeroUIProvider>
                <RawIntlProvider value={intl}>
                    <AppErrorBoundary>
                        <QueryNormalizerProvider queryClient={dataManager.queryClient}>
                            <DataManagerContext.Provider value={dataManager}>
                                <QueryClientProvider client={dataManager.queryClient}>
                                    <SupabaseAuthProvider>
                                        <UserProvider>
                                            {({ user }) => (
                                                <ThemeProvider
                                                    theme={user?.theme || themeFromQuery}
                                                >
                                                    <ToasterProvider>
                                                        <RouterProviderWithSuspense
                                                            router={router}
                                                        />
                                                    </ToasterProvider>
                                                </ThemeProvider>
                                            )}
                                        </UserProvider>
                                    </SupabaseAuthProvider>
                                </QueryClientProvider>
                            </DataManagerContext.Provider>
                        </QueryNormalizerProvider>
                    </AppErrorBoundary>
                </RawIntlProvider>
            </HeroUIProvider>
        </React.StrictMode>,
    );
};

bootstrap();
