import type {
    AddWordTranslationsRequest,
    CreateWordRequest,
    DeleteWordTranslationsRequest,
    DeleteWordsRequest,
    FetchWordsNextPageToken,
    FetchWordsRequest,
    FetchWordsResponse,
    UpdateWordsStatusRequest,
} from "./types";
import type { SupabaseClient } from "../../supabase";

export const createWordsActions = (supabase: SupabaseClient) => {
    const fetchWords = async (props: FetchWordsRequest): Promise<FetchWordsResponse> => {
        const itemsRequest = supabase
            .from("words")
            .select("*, translations (id, text, language)")
            .filter("language", "eq", props.language)
            .order("sort_id", { ascending: false })
            .limit(props.pageSize + 1)
            .throwOnError();

        if (props.pageToken) {
            itemsRequest.filter("sort_id", "lt", props.pageToken);
        }

        if (props.filter) {
            if (props.filter.text) {
                itemsRequest.filter("text", "like", `%${props.filter.text}%`);
            }
            if (props.filter.status) {
                itemsRequest.filter("status", "eq", props.filter.status);
            }
        }

        const itemsResponse = await itemsRequest;

        const lastItem = itemsResponse.data.at(-2);

        const nextPageToken: FetchWordsNextPageToken | null =
            lastItem && itemsResponse.data.length === props.pageSize + 1 ? lastItem.sort_id : null;

        return {
            words: itemsResponse.data.slice(0, props.pageSize),
            nextPageToken,
        };
    };

    const updateWordsStatus = async (props: UpdateWordsStatusRequest) => {
        return await supabase
            .from("words")
            .update({ status: props.status })
            .in("id", props.wordsIds)
            .select()
            .throwOnError();
    };

    const addWordTranslations = async (props: AddWordTranslationsRequest) => {
        return await supabase
            .from("translations")
            .insert(
                props.translations.map((translation) => ({
                    word_id: props.wordId,
                    ...translation,
                })),
            )
            .throwOnError();
    };

    const deleteWordTranslations = async (props: DeleteWordTranslationsRequest) => {
        return await supabase
            .from("translations")
            .delete()
            .in("id", props.translationsIds)
            .throwOnError();
    };

    const createWord = async (props: CreateWordRequest) => {
        const word = await supabase
            .from("words")
            .insert(props.word)
            .select()
            .single()
            .throwOnError();

        await addWordTranslations({
            wordId: word.data.id,
            translations: props.translations,
        });

        return await supabase
            .from("words")
            .select("*, translations (text, language)")
            .filter("id", "eq", word.data.id)
            .throwOnError();
    };

    const deleteWords = async (props: DeleteWordsRequest) => {
        return await supabase.from("words").delete().in("id", props.wordIds).throwOnError();
    };

    return {
        fetchWords,
        updateWordsStatus,
        addWordTranslations,
        deleteWordTranslations,
        createWord,
        deleteWords,
    };
};
