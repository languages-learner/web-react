export { supabase } from "./supabase";

export type {
    Database as ApiDatabase,
    Tables as ApiTables,
    TablesInsert as ApiTablesInsert,
    TablesUpdate as ApiTablesUpdate,
    Enums as ApiEnums,
    CompositeTypes as ApiCompositeType,
} from "./database.types";

export { Constants as ApiConstants } from "./database.types";
export { sdk } from "./sdk";
export type {
    ApiError,
    PaginatedResponse,
    PaginatedRequestParams,
} from "./types";
export { getErrorMessage } from "./utils/getErrorMessage";
