import React from "react";

import { ToastProvider } from "@heroui/toast";

export const ToasterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <React.Fragment>
            <ToastProvider />
            {children}
        </React.Fragment>
    );
};
