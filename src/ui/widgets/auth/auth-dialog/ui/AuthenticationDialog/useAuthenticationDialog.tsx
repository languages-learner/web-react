import { useDialog } from "@/shared/ui";

import { AuthenticationDialog } from "./AuthenticationDialog";

export const useAuthenticationDialog = () => {
    const { show, hide, DialogElement } = useDialog(
        ({ open, onClose, onOpenChange }) => {
            return (
                <AuthenticationDialog
                    onClose={onClose}
                    open={open}
                    onOpenChange={onOpenChange}
                />
            );
        },
    );

    return {
        showAuthenticationDialog: show,
        hideAuthenticationDialog: hide,
        AuthenticationDialog: DialogElement,
    };
};
