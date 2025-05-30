import React from "react";

import { DataManagerContext } from "@gravity-ui/data-source";
import { ThemeProvider } from "@gravity-ui/uikit";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { UserProvider } from "@/entities/user";
import { dataManager } from "@/shared/data-source";
import { SupabaseAuthProvider } from "@/shared/services/auth";
import { ToasterProvider } from "@/shared/ui";

import { routes } from "../routes";

import "@/app/styles/imports.scss";
import "@/app/styles/reset.scss";

const bootstrap = () => {
    const router = createBrowserRouter([
        {
            id: "main",
            path: "/",
            element: <Outlet />,
            // errorElement: <div>TODO: ERROR</div>,
            children: routes,
        },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <DataManagerContext.Provider value={dataManager}>
                <QueryClientProvider client={dataManager.queryClient}>
                    <SupabaseAuthProvider>
                        <UserProvider>
                            <ThemeProvider theme={"dark"}>
                                <ToasterProvider>
                                    <RouterProvider router={router} />
                                </ToasterProvider>
                            </ThemeProvider>
                        </UserProvider>
                    </SupabaseAuthProvider>
                </QueryClientProvider>
            </DataManagerContext.Provider>
        </React.StrictMode>,
    );
};

bootstrap();
