import React from "react";

import type { ModalProps } from "@heroui/modal";

type DialogProps = Pick<ModalProps, "isOpen" | "onClose" | "onOpenChange">;

type DialogRenderer = (props: DialogProps) => React.ReactNode;

export const useDialog = (renderer: DialogRenderer) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const show = React.useCallback(() => setIsOpen(true), []);
    const hide = React.useCallback(() => setIsOpen(false), []);

    const DialogElement = React.useMemo(
        () =>
            renderer({
                isOpen,
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
