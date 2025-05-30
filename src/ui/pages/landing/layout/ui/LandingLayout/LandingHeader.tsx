import { Button, Flex } from "@gravity-ui/uikit";

import { LanguageSelector } from "@/features/language/languageSelector/ui/LanguageSelector";
import { intl } from "@/shared/i18n";
import { useNavigate, workspaceRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";
import { useAuthenticationDialog } from "@/widgets/auth/auth-dialog";

export const LandingHeader = () => {
    const { isLoggedIn } = useAuth();
    const { showAuthenticationDialog, AuthenticationDialog } = useAuthenticationDialog();
    const navigate = useNavigate();

    return (
        <Flex justifyContent={"flex-end"} alignItems={"center"} gap={3}>
            <LanguageSelector />
            {isLoggedIn ? (
                <Button onClick={() => navigate(workspaceRoutes.dictionary)}>
                    {intl.formatMessage({
                        defaultMessage: "Go to workspace",
                    })}
                </Button>
            ) : (
                <Flex gap={3}>
                    <Button view={"action"} onClick={showAuthenticationDialog} size={"l"}>
                        {intl.formatMessage({
                            defaultMessage: "Sign in",
                        })}
                    </Button>
                    <Button view={"action"} size={"l"}>
                        {intl.formatMessage({
                            defaultMessage: "Sign up",
                        })}
                    </Button>
                </Flex>
            )}
            {AuthenticationDialog}
        </Flex>
    );
};
