import { useDialog } from "@languages-learner/uikit";

import { AuthenticationDialog } from "./AuthenticationDialog";

export const useAuthenticationDialog = () => {
    const { show, hide, DialogElement } = useDialog((dialogProps) => {
        return <AuthenticationDialog {...dialogProps} />;
    });

    return {
        showAuthenticationDialog: show,
        hideAuthenticationDialog: hide,
        AuthenticationDialog: DialogElement,
    };
};
