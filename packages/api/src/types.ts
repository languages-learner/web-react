import type { PostgrestError } from "@supabase/supabase-js";

export interface PaginatedRequestParams<T = string> {
    pageSize: number;
    pageToken?: T;
}

export interface PaginatedResponse<T = string> {
    nextPageToken: T | null;
}

export type ApiError = PostgrestError;
