import React from "react";

import { LandingHeader } from "./LandingHeader";

export type LandingLayoutProps = React.PropsWithChildren;

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div
            className={
                "bg-linear-[135deg,var(--color-private-green-50),var(--color-private-green-350)] h-screen w-svw"
            }
        >
            <LandingHeader />
            <div
                className={
                    "px-30 h-[calc(100vh-var(--app-layout-header-height))] overflow-y-hidden pt-20"
                }
            >
                {children}
            </div>
        </div>
    );
};
