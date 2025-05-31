import { intl } from "@/shared/i18n";

import type { ApiDatabase } from "@/shared/services/api";

export const THEME_NAME: Record<ApiDatabase["public"]["Enums"]["Theme"], string> = {
    system: intl.formatMessage({ defaultMessage: "System", id: "+CwN9C" }),
    dark: intl.formatMessage({ defaultMessage: "Dark", id: "tOdNiY" }),
    light: intl.formatMessage({ defaultMessage: "Light", id: "3cc4Ct" }),
};
