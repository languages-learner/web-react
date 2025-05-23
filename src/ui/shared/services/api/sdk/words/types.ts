import { type ApiDatabase } from "@/shared/services/api";
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

export interface UpdateWordStatusParams {
    wordId: string;
    status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
}
