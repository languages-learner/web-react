import { OfficeLayout } from "@/pages/workspace/office/layout";
import { intl } from "@/shared/i18n";

export const OfficeProfilePage = () => {
    return (
        <OfficeLayout title={intl.formatMessage({ defaultMessage: "Profile", id: "itPgxd" })}>
            Profile
        </OfficeLayout>
    );
};
