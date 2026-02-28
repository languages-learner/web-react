import { FormRowsContainer } from "@languages-learner/form-components";
import { withToasts } from "@languages-learner/uikit";
import { INTERFACE_LOCALES } from "shared/project-config";
import type { ApiTables } from "@languages-learner/api";

import { useUserMutations, useUserSafe } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { LearningLanguageSelector } from "@/features/learning-language/learningLanguageSelector";
import { ThemeSelector } from "@/features/theme/themeSelector";
import { OfficeLayout } from "@/pages/workspace/office/layout";
import { intl } from "@/shared/i18n";

export const OfficeSettingsPage = () => {
    const { user } = useUserSafe();
    const { updateUser } = useUserMutations();

    const handleUpdateNativeLanguage = (language: string) => {
        return withToasts(
            updateUser.mutateAsync({
                userId: user.uid,
                payload: {
                    native_language: language,
                },
            }),
            {
                success: intl.formatMessage({
                    defaultMessage: "User native language successfully updated!",
                    id: "cEP2o6",
                }),
                error: intl.formatMessage({
                    defaultMessage: "Error updating user native language",
                    id: "AxApyG",
                }),
            },
        );
    };

    const handleUpdateInterfaceLanguage = (language: string) => {
        return withToasts(
            updateUser.mutateAsync({
                userId: user.uid,
                payload: {
                    interface_language: language,
                },
            }),
            {
                success: intl.formatMessage({
                    defaultMessage: "User interface language successfully updated!",
                    id: "WvA01e",
                }),
                error: intl.formatMessage({
                    defaultMessage: "Error updating user interface language",
                    id: "tvorNQ",
                }),
            },
        );
    };

    const handleUpdateTheme = (theme: ApiTables<"user">["theme"]) => {
        return withToasts(
            updateUser.mutateAsync({
                userId: user.uid,
                payload: {
                    theme,
                },
            }),
            {
                success: intl.formatMessage({
                    defaultMessage: "User theme successfully updated!",
                    id: "IcY6iN",
                }),
                error: intl.formatMessage({
                    defaultMessage: "Error updating user theme",
                    id: "qW/XjQ",
                }),
            },
        );
    };

    return (
        <OfficeLayout title={intl.formatMessage({ defaultMessage: "Settings", id: "D3idYv" })}>
            <FormRowsContainer>
                <FormRowsContainer.Row
                    title={intl.formatMessage({ defaultMessage: "Native language", id: "S7y0Y8" })}
                >
                    <LanguageSelector
                        disallowEmptySelection
                        fullName
                        selectedKeys={[user.nativeLanguage]}
                        onSelectionChange={(value) => {
                            if (value.currentKey) {
                                handleUpdateNativeLanguage(value.currentKey);
                            }
                        }}
                    />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row
                    title={intl.formatMessage({
                        defaultMessage: "Interface language",
                        id: "sM7TRG",
                    })}
                >
                    <LanguageSelector
                        disallowEmptySelection
                        fullName
                        languages={INTERFACE_LOCALES}
                        selectedKeys={[user.interfaceLanguage]}
                        onSelectionChange={(value) => {
                            if (value.currentKey) {
                                handleUpdateInterfaceLanguage(value.currentKey);
                            }
                        }}
                    />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row
                    title={intl.formatMessage({
                        defaultMessage: "Learning language",
                        id: "fJ/RT7",
                    })}
                >
                    <LearningLanguageSelector fullName />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row
                    title={intl.formatMessage({
                        defaultMessage: "Theme",
                        id: "Pe0ogR",
                    })}
                >
                    <ThemeSelector
                        selectedKeys={[user.theme]}
                        onSelectionChange={(value) => {
                            if (value.currentKey) {
                                handleUpdateTheme(value.currentKey as ApiTables<"user">["theme"]);
                            }
                        }}
                    />
                </FormRowsContainer.Row>
            </FormRowsContainer>
        </OfficeLayout>
    );
};
