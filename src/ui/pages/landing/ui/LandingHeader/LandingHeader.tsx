import { Button, Flex } from "@gravity-ui/uikit";
import { useNavigate } from "react-router";

import { workspaceRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";
import { useAuthenticationDialog } from "@/widgets/auth/auth-dialog";

export const LandingHeader = () => {
    const { isLoggedIn } = useAuth();
    const { showAuthenticationDialog, AuthenticationDialog } = useAuthenticationDialog();
    const navigate = useNavigate();

    return (
        <Flex justifyContent={"flex-end"}>
            {isLoggedIn ? (
                <Button onClick={() => navigate(workspaceRoutes.dictionary)}>
                    Go to workspace
                </Button>
            ) : (
                <Flex gap={3}>
                    <Button view={"action"} onClick={showAuthenticationDialog} size={"l"}>
                        sign_in
                    </Button>
                    <Button view={"action"} size={"l"}>
                        sign_up
                    </Button>
                </Flex>
            )}
            {AuthenticationDialog}
        </Flex>
    );
};
