import { createHrefTyped } from "@languages-learner/react-router-utils";
import { classNames } from "@languages-learner/class-names";
import { BASE_THEME, INTERFACE_LOCALES } from "shared/project-config";
import type { FC } from "react";

import type { ApiTables } from "@languages-learner/api";

import { useUser, useUserMutations } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { ThemeSelector } from "@/features/theme/themeSelector";
import { intl } from "@/shared/i18n";
import { getLocaleFromPathSafe } from "@/shared/react-router";
import { landingRoutes } from "@/shared/routes";
import { useThemeQuery } from "@/shared/theme";

export interface LandingPreferencesControlsProps {
    className?: string;
}

export const LandingPreferencesControls: FC<LandingPreferencesControlsProps> = ({ className }) => {
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
        <div
            className={classNames(
                "flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:flex-nowrap md:justify-end",
                className,
            )}
        >
            <div className="w-full md:w-fit">
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
            <div className="w-full md:w-fit">
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
        </div>
    );
};
