import React from "react";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import type { ModalProps } from "@heroui/modal";

import { intl } from "@/shared/i18n";
import { useAuth } from "@/shared/services/auth";

export type AuthenticationDialogProps = Pick<ModalProps, "isOpen" | "onClose" | "onOpenChange">;

export const AuthenticationDialog: React.FC<AuthenticationDialogProps> = ({
    isOpen,
    onClose,
    onOpenChange,
}) => {
    const { supabase } = useAuth();

    return (
        <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    {intl.formatMessage({ defaultMessage: "Authentication", id: "YeKWbP" })}
                </ModalHeader>
                <ModalBody>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={["google"]}
                        // TODO: Add localization
                        localization={undefined}
                        redirectTo={window.location.origin}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
