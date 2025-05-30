import React from "react";

import { spacing } from "@gravity-ui/uikit";

import { LandingHeader } from "./LandingHeader";

export type LandingLayoutProps = React.PropsWithChildren;

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div>
            <LandingHeader />
            <div className={spacing({ p: 10 })}>{children}</div>
        </div>
    );
};
