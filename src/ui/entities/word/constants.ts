import type { ApiDatabase } from "@/shared/services/api";

export const WORD_STATUS_NAME: Record<
    ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
    string
> = {
    New: "New",
    Learn: "Learn",
    Learned: "Learned",
};
