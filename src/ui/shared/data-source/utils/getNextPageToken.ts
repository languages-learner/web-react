import {
    type PaginatedRequestParams,
    type PaginatedResponse,
} from "@/shared/services/api/types";

export const getNextPageToken = ({
    nextPageToken,
}: PaginatedResponse): Pick<PaginatedRequestParams, "pageToken"> | null =>
    nextPageToken ? { pageToken: nextPageToken } : null;
