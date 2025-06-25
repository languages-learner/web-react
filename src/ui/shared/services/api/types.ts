import { type PostgrestError } from "@supabase/supabase-js";

export interface PaginatedRequestParams<T = string> {
    pageSize: number;
    pageToken?: T;
}

export interface PaginatedResponse<T = string> {
    nextPageToken: T | null;
}

export type ApiError = PostgrestError;

export type {
    Database as ApiDatabase,
    Tables as ApiTables,
    TablesInsert as ApiTablesInsert,
    TablesUpdate as ApiTablesUpdate,
    Enums as ApiEnums,
    CompositeTypes as ApiCompositeType,
} from "./database.types.generated";

export { Constants as ApiConstants } from "./database.types.generated";
