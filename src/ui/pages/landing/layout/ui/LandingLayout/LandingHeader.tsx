import { Button, Flex } from "@gravity-ui/uikit";

import { useUser, useUserMutations } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { block } from "@/shared/class-names";
import { intl } from "@/shared/i18n";
import { INTERFACE_LOCALES } from "@/shared/project-config";
import { createHrefTyped, getLocaleFromPathSafe, useNavigate } from "@/shared/react-router";
import { landingRoutes, workspaceRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";
import { useAuthenticationDialog } from "@/widgets/auth/auth-dialog";

import "./LandingHeader.scss";

const b = block("LandingHeader");

export const LandingHeader = () => {
    const { isLoggedIn } = useAuth();
    const { showAuthenticationDialog, AuthenticationDialog } = useAuthenticationDialog();
    const navigate = useNavigate();
    const { user } = useUser();
    const { updateUser } = useUserMutations();

    const currentInterfaceLanguage = user ? user.interfaceLanguage : getLocaleFromPathSafe();
    const handleUpdateInterfaceLanguage = (language: string) => {
        if (user) {
            return updateUser.mutateAsync({
                userId: user.uid,
                payload: {
                    interface_language: language,
                },
            });
        }

        window.location.pathname = createHrefTyped(landingRoutes.root, { locale: language });
    };

    return (
        <Flex justifyContent={"flex-end"} alignItems={"center"} gap={3} className={b()}>
            <div>
                <LanguageSelector
                    fullName
                    languages={INTERFACE_LOCALES}
                    width={"max"}
                    size={"l"}
                    value={[currentInterfaceLanguage]}
                    onUpdate={([value]) => handleUpdateInterfaceLanguage(value)}
                />
            </div>
            {isLoggedIn ? (
                <Button onClick={() => navigate(workspaceRoutes.dictionary)} view={"action"}>
                    {intl.formatMessage({
                        defaultMessage: "Go to workspace",
                        id: "p9PNBI",
                    })}
                </Button>
            ) : (
                <Flex gap={3}>
                    <Button view={"action"} onClick={showAuthenticationDialog} size={"l"}>
                        {intl.formatMessage({
                            defaultMessage: "Sign in",
                            id: "SQJto2",
                        })}
                    </Button>
                    <Button view={"action"} size={"l"}>
                        {intl.formatMessage({
                            defaultMessage: "Sign up",
                            id: "8HJxXG",
                        })}
                    </Button>
                </Flex>
            )}
            {AuthenticationDialog}
        </Flex>
    );
};
