import { type ApiDatabase, supabase } from "@/shared/services/api";
import {
    type PaginatedRequestParams,
    type PaginatedResponse,
} from "@/shared/services/api/types";

export interface FetchWordsRequestParams extends PaginatedRequestParams {
    language: string;
}

export interface FetchWordsResponse extends PaginatedResponse {
    words: ApiDatabase["public"]["Tables"]["words"]["Row"][];
}

export const fetchWords = async (
    props: FetchWordsRequestParams,
): Promise<FetchWordsResponse> => {
    const itemsRequest = supabase
        .from("words")
        .select("*")
        .filter("language", "eq", props.language)
        .order("created_at", { ascending: false })
        .limit(props.pageSize + 1)
        .throwOnError();

    if (props.pageToken) {
        itemsRequest.filter("id", "gt", props.pageToken);
    }

    const itemsResponse = await itemsRequest;

    const nextPageToken =
        itemsResponse.data?.length === props.pageSize + 1
            ? (itemsResponse.data?.at(-2)?.id ?? null)
            : null;

    return {
        words: itemsResponse.data?.slice(0, props.pageSize) ?? [],
        nextPageToken,
    };
};
