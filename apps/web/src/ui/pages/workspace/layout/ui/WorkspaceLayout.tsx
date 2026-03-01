import React from "react";

import { WorkspaceHeader } from "./WorkspaceHeader";

export type WorkspaceLayoutProps = React.PropsWithChildren;

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
    return (
        <div className={"h-screen"}>
            <WorkspaceHeader />
            <div
                className={
                    "mx-auto min-h-[calc(100vh-var(--app-layout-header-height))] max-w-[calc(var(--spacing)*10+var(--workspace-page-max-width))] overflow-y-auto px-5 py-10"
                }
            >
                {children}
            </div>
        </div>
    );
};
