import type { ApiEnums } from "@languages-learner/api";

import { intl } from "@/shared/i18n";

export const THEME_NAME: Record<ApiEnums<"Theme">, string> = {
    system: intl.formatMessage({ defaultMessage: "System", id: "+CwN9C" }),
    dark: intl.formatMessage({ defaultMessage: "Dark", id: "tOdNiY" }),
    light: intl.formatMessage({ defaultMessage: "Light", id: "3cc4Ct" }),
};
