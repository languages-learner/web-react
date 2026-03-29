import React from "react";

import { renderToString } from "react-dom/server";

import { RouteChunkFallback } from "./router";

export const render = () => {
    const html = renderToString(
        <React.StrictMode>
            <RouteChunkFallback />
        </React.StrictMode>,
    );

    return { html };
};
