import { type PostgrestError } from "@supabase/supabase-js";

export interface PaginatedRequestParams {
    pageSize: number;
    pageToken?: string;
}

export interface PaginatedResponse {
    nextPageToken: string | null;
}

export type ApiError = PostgrestError;
