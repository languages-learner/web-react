import type { PaginatedRequestParams, PaginatedResponse } from "@languages-learner/api";

export const getNextPageToken = <T>({
    nextPageToken,
}: PaginatedResponse<T>): Pick<PaginatedRequestParams<T>, "pageToken"> | null =>
    nextPageToken ? { pageToken: nextPageToken } : null;
