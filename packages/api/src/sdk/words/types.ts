import type { ApiDatabase, ApiTables } from "../../database.types.public";
import type { PaginatedRequestParams, PaginatedResponse } from "../../types";

export type FetchWordsNextPageToken = number;

export interface FetchWordsRequest extends PaginatedRequestParams<FetchWordsNextPageToken> {
    language: string;
    filter?: {
        text?: string;
        status?: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
    };
}

export interface FetchWordsResponse extends PaginatedResponse<FetchWordsNextPageToken> {
    words: WordWithTranslations[];
}

export type WordWithTranslations = ApiDatabase["public"]["Tables"]["words"]["Row"] & {
    translations: Pick<ApiTables<"translations">, "text" | "language" | "id">[];
};

export interface UpdateWordsStatusRequest {
    wordsIds: string[];
    status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
}

export interface AddWordTranslationsRequest {
    wordId: string;
    translations: Omit<
        ApiTables<"translations">,
        "id" | "created_at" | "updated_at" | "user_id" | "word_id"
    >[];
}

export interface DeleteWordTranslationsRequest {
    wordId: string;
    translationsIds: string[];
}

export interface CreateWordRequest {
    word: Omit<
        ApiDatabase["public"]["Tables"]["words"]["Row"],
        "id" | "created_at" | "status" | "updated_at" | "user_id" | "sort_id"
    >;
    translations: Omit<
        ApiDatabase["public"]["Tables"]["translations"]["Row"],
        "id" | "created_at" | "updated_at" | "user_id" | "word_id"
    >[];
}

export interface DeleteWordsRequest {
    wordIds: string[];
}
