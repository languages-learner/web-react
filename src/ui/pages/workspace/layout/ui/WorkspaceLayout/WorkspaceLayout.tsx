import React from "react";

import { spacing } from "@gravity-ui/uikit";

import { WorkspaceHeader } from "../WorkspaceHeader";

export type WorkspaceLayoutProps = React.PropsWithChildren;

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
    children,
}) => {
    return (
        <div>
            <WorkspaceHeader />
            <div className={spacing({ p: 10 })}>{children}</div>
        </div>
    );
};
