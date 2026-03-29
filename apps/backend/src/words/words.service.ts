import { Inject, Injectable } from "@nestjs/common";
import { SUPABASE_USER_CLIENT } from "../supabase-client/supabase-user-client.token";
import type { SupabaseUserClient } from "../supabase-client/supabase-user-client.token";
import type { FetchWordsRequest } from "./dto/fetch-words.dto";
import type { UpdateWordsStatusRequest } from "./dto/update-words-status.dto";
import type { CreateWordRequest } from "./dto/create-word.dto";
import type { AddWordTranslationsRequest } from "./dto/add-translations.dto";
import type { DeleteWordTranslationsRequest } from "./dto/delete-translations.dto";
import type { DeleteWordsRequest } from "./dto/delete-words.dto";

@Injectable()
export class WordsService {
    constructor(@Inject(SUPABASE_USER_CLIENT) private readonly supabase: SupabaseUserClient) {}

    async fetchWords(dto: FetchWordsRequest, userId: string) {
        const itemsRequest = this.supabase
            .from("words")
            .select("*, translations (id, text, language)")
            .eq("user_id", userId)
            .filter("language", "eq", dto.language)
            .order("sort_id", { ascending: false })
            .limit(dto.pageSize + 1)
            .throwOnError();

        if (dto.pageToken) {
            itemsRequest.filter("sort_id", "lt", dto.pageToken);
        }

        if (dto.filterText) {
            itemsRequest.filter("text", "like", `%${dto.filterText}%`);
        }
        if (dto.filterStatus) {
            itemsRequest.filter("status", "eq", dto.filterStatus);
        }

        const itemsResponse = await itemsRequest;

        const lastItem = itemsResponse.data?.at(-2);
        const nextPageToken =
            lastItem && itemsResponse.data && itemsResponse.data.length === dto.pageSize + 1
                ? lastItem.sort_id
                : null;

        return {
            words: itemsResponse.data?.slice(0, dto.pageSize) || [],
            nextPageToken,
        };
    }

    async updateWordsStatus(dto: UpdateWordsStatusRequest, userId: string) {
        const response = await this.supabase
            .from("words")
            .update({ status: dto.status })
            .in("id", dto.wordsIds)
            .eq("user_id", userId)
            .select()
            .throwOnError();

        return response.data;
    }

    async createWord(dto: CreateWordRequest, userId: string) {
        // Get max sort_id for this user
        const { data: maxSortData } = await this.supabase
            .from("words")
            .select("sort_id")
            .eq("user_id", userId)
            .order("sort_id", { ascending: false })
            .limit(1)
            .single();

        const nextSortId = maxSortData ? (maxSortData.sort_id || 0) + 1 : 1;

        const word = await this.supabase
            .from("words")
            .insert({
                ...dto.word,
                user_id: userId,
                sort_id: nextSortId,
            })
            .select()
            .single()
            .throwOnError();

        await this.supabase
            .from("translations")
            .insert(
                dto.translations.map((translation) => ({
                    word_id: word.data.id,
                    user_id: userId,
                    ...translation,
                })),
            )
            .throwOnError();

        const result = await this.supabase
            .from("words")
            .select("*, translations (id, text, language)")
            .eq("id", word.data.id)
            .single()
            .throwOnError();

        return result.data;
    }

    async deleteWords(dto: DeleteWordsRequest, userId: string) {
        const response = await this.supabase
            .from("words")
            .delete()
            .in("id", dto.wordIds)
            .eq("user_id", userId)
            .throwOnError();

        return response.data;
    }

    async addWordTranslations(wordId: string, dto: AddWordTranslationsRequest, userId: string) {
        const response = await this.supabase
            .from("translations")
            .insert(
                dto.translations.map((translation) => ({
                    word_id: wordId,
                    user_id: userId,
                    ...translation,
                })),
            )
            .throwOnError();

        return response.data;
    }

    async deleteWordTranslations(
        wordId: string,
        dto: DeleteWordTranslationsRequest,
        userId: string,
    ) {
        const response = await this.supabase
            .from("translations")
            .delete()
            .in("id", dto.translationsIds)
            .eq("word_id", wordId)
            .eq("user_id", userId)
            .throwOnError();

        return response.data;
    }
}
