import React from "react";

import { spacing } from "@gravity-ui/uikit";

import { block, classNames } from "@/shared/class-names";

import { WorkspaceHeader } from "../WorkspaceHeader";

import "./WorkspaceLayout.scss";

const b = block("WorkspaceLayout");

export type WorkspaceLayoutProps = React.PropsWithChildren;

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
    return (
        <div className={b()}>
            <WorkspaceHeader />
            <div className={classNames(b("Content"), spacing({ p: 10 }))}>{children}</div>
        </div>
    );
};
