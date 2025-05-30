import { intl } from "@/shared/i18n";

import type { ApiDatabase } from "@/shared/services/api";

export const WORD_STATUS_NAME: Record<
    ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
    string
> = {
    New: intl.formatMessage({
        defaultMessage: "New",
    }),
    Learn: intl.formatMessage({
        defaultMessage: "Learn",
    }),
    Learned: intl.formatMessage({
        defaultMessage: "Learned",
    }),
};
