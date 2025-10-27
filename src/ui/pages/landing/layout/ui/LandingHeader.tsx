import { Button } from "@heroui/button";

import { useUser, useUserMutations } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { ThemeSelector } from "@/features/theme/themeSelector";
import { intl } from "@/shared/i18n";
import { createHrefTyped, getLocaleFromPathSafe, useNavigate } from "@/shared/react-router";
import { landingRoutes, workspaceRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";
import { useThemeQuery } from "@/shared/theme";
import { useAuthenticationDialog } from "@/widgets/auth/auth-dialog";
import { BASE_THEME, INTERFACE_LOCALES } from "shared/project-config";

import type { ApiTables } from "shared/services/api";

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
        <div className={"h-(--app-layout-header-height) flex items-center justify-end gap-3 px-5"}>
            <div>
                <ThemeSelector
                    // TODO: Remove after fixing issue - https://github.com/heroui-inc/heroui/issues/5853
                    classNames={{
                        innerWrapper: "w-full pr-6",
                    }}
                    selectedKeys={[currentTheme]}
                    onSelectionChange={(value) => {
                        if (value.currentKey) {
                            handleUpdateTheme(value.currentKey as ApiTables<"user">["theme"]);
                        }
                    }}
                    startContent={intl.formatMessage({ defaultMessage: "Theme", id: "Pe0ogR" })}
                />
            </div>
            <div>
                <LanguageSelector
                    startContent={intl.formatMessage({ defaultMessage: "Language", id: "y1Z3or" })}
                    classNames={{
                        innerWrapper: "w-full pr-6",
                    }}
                    fullName
                    languages={INTERFACE_LOCALES}
                    selectedKeys={[currentInterfaceLanguage]}
                    onSelectionChange={(value) => {
                        if (value.currentKey) {
                            handleUpdateInterfaceLanguage(value.currentKey);
                        }
                    }}
                />
            </div>
            {isLoggedIn ? (
                <Button onPress={() => navigate(workspaceRoutes.dictionary)} color="primary">
                    {intl.formatMessage({
                        defaultMessage: "Go to workspace",
                        id: "p9PNBI",
                    })}
                </Button>
            ) : (
                <div className="flex gap-3">
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
