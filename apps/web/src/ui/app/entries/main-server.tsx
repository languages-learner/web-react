import React from "react";

import { Loader } from "@languages-learner/uikit";
import { renderToString } from "react-dom/server";

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
