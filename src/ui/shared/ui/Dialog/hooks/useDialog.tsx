import React from "react";

import { type DialogProps as BaseDialogProps } from "@gravity-ui/uikit";

type DialogProps = Pick<BaseDialogProps, "open" | "onClose" | "onOpenChange">;

type DialogRenderer = (props: DialogProps) => React.ReactNode;

export const useDialog = (renderer: DialogRenderer) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const show = React.useCallback(() => setIsOpen(true), []);
    const hide = React.useCallback(() => setIsOpen(false), []);

    const DialogElement = React.useMemo(
        () =>
            renderer({
                open: isOpen,
                onClose: hide,
                onOpenChange: (value) => {
                    if (value) {
                        show();
                    } else {
                        hide();
                    }
                },
            }),
        [renderer, isOpen, hide, show],
    );

    return { show, hide, DialogElement };
};
