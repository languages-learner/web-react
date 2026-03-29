import type { ApiEnums } from "@languages-learner/api";

export interface WordsTableFiltersType {
    text?: string;
    status?: ApiEnums<"UserWordStatus">;
}

export const initialFilters: WordsTableFiltersType = {
    text: "",
    status: undefined,
};
