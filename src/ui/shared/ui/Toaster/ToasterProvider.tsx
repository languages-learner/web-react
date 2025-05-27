import React from "react";

import { ToasterProvider as BaseToasterProvider, ToasterComponent } from "@gravity-ui/uikit";
import { toaster } from "@gravity-ui/uikit/toaster-singleton";

export const ToasterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <BaseToasterProvider toaster={toaster}>
            {children}
            <ToasterComponent />
        </BaseToasterProvider>
    );
};
