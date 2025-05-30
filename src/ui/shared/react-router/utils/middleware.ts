import type React from "react";

import { type LoaderFunction, type RouteObject } from "react-router";

export interface MiddlewareProps {
    loader: LoaderFunction;
    element: React.ReactNode;
    routes: RouteObject[];
}

export const middleware = ({ loader, element, routes }: MiddlewareProps): RouteObject => {
    return {
        loader,
        element,
        children: routes.map((route) => ({ ...route, loader })),
    };
};
