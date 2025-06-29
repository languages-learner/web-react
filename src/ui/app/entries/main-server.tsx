import React from "react";

import { Loader } from "@gravity-ui/uikit";
import { renderToString } from "react-dom/server";

const isProduction = process.env.NODE_ENV === "production";

export const render = () => {
    const html = renderToString(
        <React.StrictMode>
            <div
                style={{
                    width: "100wh",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loader size={"l"} />
            </div>
        </React.StrictMode>,
    );

    const head = isProduction
        ? ``
        : `
        <link rel="stylesheet" href="/src/ui/app/styles/gravity-imports.css" />
        <link rel="stylesheet" href="/src/ui/app/styles/gravity-theme.css" />
        <link rel="stylesheet" href="/src/ui/app/styles/reset.css" />
        <link rel="stylesheet" href="/node_modules/@gravity-ui/uikit/build/esm/components/Loader/Loader.css" />
    `;

    return { html, head };
};
