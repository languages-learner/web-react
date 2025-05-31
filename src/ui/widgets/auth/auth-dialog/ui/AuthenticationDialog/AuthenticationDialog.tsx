import React from "react";

import { Dialog, type DialogProps } from "@gravity-ui/uikit";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useAuth } from "@/shared/services/auth";

export type AuthenticationDialogProps = Omit<DialogProps, "children">;

export const AuthenticationDialog: React.FC<AuthenticationDialogProps> = ({ ...dialogProps }) => {
    const { supabase } = useAuth();

    return (
        <Dialog {...dialogProps} size={"s"}>
            <Dialog.Header caption={"Authentication"}></Dialog.Header>
            <Dialog.Body>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={["google"]}
                    // TODO: Add localization
                    localization={undefined}
                />
            </Dialog.Body>
        </Dialog>
    );
};
