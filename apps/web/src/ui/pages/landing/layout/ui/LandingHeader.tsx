import { Button } from "@heroui/button";

import { LandingPreferencesControls } from "./LandingPreferencesControls";
import { intl } from "@/shared/i18n";
import { useNavigate } from "@/shared/react-router";
import { workspaceRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";
import { useAuthenticationDialog } from "@/widgets/auth/auth-dialog";

export const LandingHeader = () => {
    const { isLoggedIn } = useAuth();
    const { showAuthenticationDialog, AuthenticationDialog } = useAuthenticationDialog();
    const navigate = useNavigate();

    return (
        <div
            className={
                "h-(--app-layout-header-height) flex shrink-0 items-center justify-end gap-2 px-4 sm:gap-3 sm:px-5"
            }
        >
            <LandingPreferencesControls className="hidden md:flex" />
            {isLoggedIn ? (
                <Button onPress={() => navigate(workspaceRoutes.dictionary)} color="primary">
                    {intl.formatMessage({
                        defaultMessage: "Go to workspace",
                        id: "p9PNBI",
                    })}
                </Button>
            ) : (
                <div className="flex gap-2 sm:gap-3">
                    <Button color="primary" onPress={showAuthenticationDialog}>
                        {intl.formatMessage({
                            defaultMessage: "Sign in",
                            id: "SQJto2",
                        })}
                    </Button>
                    <Button color="primary" onPress={showAuthenticationDialog}>
                        {intl.formatMessage({
                            defaultMessage: "Sign up",
                            id: "8HJxXG",
                        })}
                    </Button>
                </div>
            )}
            {AuthenticationDialog}
        </div>
    );
};
