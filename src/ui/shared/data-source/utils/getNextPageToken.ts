import { type PaginatedRequestParams, type PaginatedResponse } from "@/shared/services/api/types";

export const getNextPageToken = <T>({
    nextPageToken,
}: PaginatedResponse<T>): Pick<PaginatedRequestParams<T>, "pageToken"> | null =>
    nextPageToken ? { pageToken: nextPageToken } : null;
