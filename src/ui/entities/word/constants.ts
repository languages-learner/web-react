import { intl } from "@/shared/i18n";

import type { ApiDatabase } from "@/shared/services/api";

export const WORD_STATUS_NAME: Record<
    ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
    string
> = {
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
