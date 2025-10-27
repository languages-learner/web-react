import React from "react";

import { renderToString } from "react-dom/server";

import { Loader } from "@/shared/ui";

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
                <Loader size={"lg"} />
            </div>
        </React.StrictMode>,
    );

    return { html };
};
