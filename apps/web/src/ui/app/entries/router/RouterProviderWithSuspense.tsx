import { Suspense } from "react";
import { RouterProvider } from "react-router";

import { RouteChunkFallback } from "./RouteChunkFallback";
import type { RouterProviderProps } from "react-router";

type RouterProviderWithSuspenseProps = Pick<RouterProviderProps, "router">;

export const RouterProviderWithSuspense = ({ router }: RouterProviderWithSuspenseProps) => {
    return (
        <Suspense fallback={<RouteChunkFallback />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};
