import { useUserMutations, useUserSafe } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { LearningLanguageSelector } from "@/features/learning-language/learningLanguageSelector";
import { OfficeLayout } from "@/pages/workspace/office/layout";
import { FormRowsContainer } from "@/shared/form-components";
import { intl } from "@/shared/i18n";
import { INTERFACE_LOCALES } from "@/shared/project-config";
import { withToasts } from "@/shared/ui";

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
                name: "userSettingsUpdateNativeLanguage",
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
                name: "userSettingsUpdateInterfaceLanguage",
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

    return (
        <OfficeLayout title={intl.formatMessage({ defaultMessage: "Settings", id: "D3idYv" })}>
            <FormRowsContainer>
                <FormRowsContainer.Row
                    title={intl.formatMessage({ defaultMessage: "Native language", id: "S7y0Y8" })}
                >
                    <LanguageSelector
                        fullName
                        width={"max"}
                        size={"l"}
                        filterable
                        value={[user.nativeLanguage]}
                        onUpdate={([value]) => handleUpdateNativeLanguage(value)}
                    />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row
                    title={intl.formatMessage({
                        defaultMessage: "Interface language",
                        id: "sM7TRG",
                    })}
                >
                    <LanguageSelector
                        fullName
                        languages={INTERFACE_LOCALES}
                        width={"max"}
                        size={"l"}
                        value={[user.interfaceLanguage]}
                        onUpdate={([value]) => handleUpdateInterfaceLanguage(value)}
                    />
                </FormRowsContainer.Row>
                <FormRowsContainer.Row
                    title={intl.formatMessage({
                        defaultMessage: "Learning language",
                        id: "fJ/RT7",
                    })}
                >
                    <LearningLanguageSelector size={"l"} filterable fullName width={"max"} />
                </FormRowsContainer.Row>
            </FormRowsContainer>
        </OfficeLayout>
    );
};
