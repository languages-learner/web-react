import { createApiClient } from "./client";
import type { components, operations } from "../schemas/api";
import type { SupabaseClient } from "@supabase/supabase-js";

export const createSdk = (supabase: SupabaseClient) => {
    const apiClient = createApiClient(supabase);

    return {
        user: {
            fetchUser: async (): Promise<components["schemas"]["GetUserResponse"]> => {
                return apiClient.get<components["schemas"]["GetUserResponse"]>("/user");
            },
            updateUser: async (props: components["schemas"]["UpdateUserRequest"]) => {
                return apiClient.patch<components["schemas"]["UpdateUserResponse"]>("/user", {
                    payload: props.payload,
                });
            },
        },
        get words() {
            return {
                fetchWords: async (
                    props: operations["WordsController_getWords"]["parameters"]["query"],
                ) => {
                    return apiClient.get<components["schemas"]["FetchWordsResponse"]>("/words", {
                        params: props,
                    });
                },
                updateWordsStatus: async (
                    props: components["schemas"]["UpdateWordsStatusRequest"],
                ) => {
                    return apiClient.patch<components["schemas"]["UpdateWordsStatusResponse"]>(
                        "/words/status",
                        {
                            wordsIds: props.wordsIds,
                            status: props.status,
                        },
                    );
                },
                createWord: async (props: components["schemas"]["CreateWordRequest"]) => {
                    return apiClient.post<components["schemas"]["CreateWordResponse"]>("/words", {
                        word: props.word,
                        translations: props.translations,
                    });
                },
                deleteWords: async (props: components["schemas"]["DeleteWordsRequest"]) => {
                    return apiClient.delete<components["schemas"]["DeleteWordsResponse"]>(
                        "/words",
                        {
                            wordIds: props.wordIds,
                        },
                    );
                },
                addWordTranslations: async (
                    wordId: string,
                    props: components["schemas"]["AddWordTranslationsRequest"],
                ) => {
                    return apiClient.post<components["schemas"]["AddWordTranslationsResponse"]>(
                        `/words/${wordId}/translations`,
                        {
                            translations: props.translations,
                        },
                    );
                },
                deleteWordTranslations: async (
                    wordId: string,
                    props: components["schemas"]["DeleteWordTranslationsRequest"],
                ) => {
                    return apiClient.delete<
                        components["schemas"]["DeleteWordTranslationsResponse"]
                    >(`/words/${wordId}/translations`, {
                        translationsIds: props.translationsIds,
                    });
                },
            };
        },
    };
};
