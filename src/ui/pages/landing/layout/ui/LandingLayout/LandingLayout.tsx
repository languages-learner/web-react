import React from "react";

import { block } from "@/shared/class-names";

import { LandingHeader } from "./LandingHeader";

import "./LandingLayout.scss";

const b = block("LandingLayout");

export type LandingLayoutProps = React.PropsWithChildren;

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div className={b()}>
            <LandingHeader />
            <div className={b("Content")}>{children}</div>
        </div>
    );
};
