import { Button, Flex } from "@gravity-ui/uikit";

import { useUser, useUserMutations } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { ThemeSelector } from "@/features/theme/themeSelector";
import { block } from "@/shared/class-names";
import { intl } from "@/shared/i18n";
import { createHrefTyped, getLocaleFromPathSafe, useNavigate } from "@/shared/react-router";
import { landingRoutes, workspaceRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";
import { useThemeQuery } from "@/shared/theme";
import { useAuthenticationDialog } from "@/widgets/auth/auth-dialog";
import { BASE_THEME, INTERFACE_LOCALES } from "shared/project-config";

import type { ApiTables } from "shared/services/api";

import "./LandingHeader.scss";

const b = block("LandingHeader");

export const LandingHeader = () => {
    const { isLoggedIn } = useAuth();
    const { showAuthenticationDialog, AuthenticationDialog } = useAuthenticationDialog();
    const navigate = useNavigate();
    const { user } = useUser();
    const { updateUser } = useUserMutations();
    const themeQuery = useThemeQuery();

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

        return Promise.resolve();
    };

    const currentTheme = user ? user.theme : (themeQuery.theme ?? BASE_THEME);
    const handleUpdateTheme = (theme: ApiTables<"user">["theme"]) => {
        if (user) {
            themeQuery.clearTheme();

            return updateUser.mutateAsync({
                userId: user.uid,
                payload: {
                    theme,
                },
            });
        }

        themeQuery.setTheme(theme);
        window.location.reload();

        return Promise.resolve();
    };

    return (
        <Flex justifyContent={"flex-end"} alignItems={"center"} gap={3} className={b()}>
            <div>
                <ThemeSelector
                    size={"l"}
                    value={[currentTheme]}
                    onUpdate={([value]) => handleUpdateTheme(value as ApiTables<"user">["theme"])}
                />
            </div>
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
                <Button
                    size={"l"}
                    onClick={() => navigate(workspaceRoutes.dictionary)}
                    view={"action"}
                >
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
