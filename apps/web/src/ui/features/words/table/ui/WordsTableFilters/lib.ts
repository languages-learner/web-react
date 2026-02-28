import type { ApiTables } from "@languages-learner/api";

export interface WordsTableFiltersType {
    text?: string;
    status?: ApiTables<"words">["status"];
}

export const initialFilters: WordsTableFiltersType = {
    text: "",
    status: undefined,
};
