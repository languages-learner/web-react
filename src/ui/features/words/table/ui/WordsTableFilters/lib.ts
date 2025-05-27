import type { ApiTables } from "@/shared/services/api";

export interface WordsTableFiltersType {
    allSelected?: boolean;
    text?: string;
    status?: ApiTables<"words">["status"];
}

export const initialFilters: WordsTableFiltersType = {
    text: "",
    status: undefined,
    allSelected: false,
};
