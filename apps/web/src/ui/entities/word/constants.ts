import type { ApiEnums } from "@languages-learner/api";

import { intl } from "@/shared/i18n";

export const WORD_STATUS_NAME: Record<ApiEnums<"UserWordStatus">, string> = {
    New: intl.formatMessage({
        defaultMessage: "New",
        id: "bW7B87",
    }),
    Learn: intl.formatMessage({
        defaultMessage: "Learn",
        id: "IbrSk1",
    }),
    Learned: intl.formatMessage({
        defaultMessage: "Learned",
        id: "Dj5u49",
    }),
};
