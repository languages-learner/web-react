import { type SupabaseClient } from "@supabase/supabase-js";

import { type FetchUserResponse, type UpdateUserParams } from "./types";

export const createUserActions = (supabase: SupabaseClient) => {
    const fetchUser = async (): Promise<FetchUserResponse> => {
        const response = await supabase.from("user").select().single().throwOnError();

        return response.data;
    };

    const updateUser = async (props: UpdateUserParams) => {
        await supabase.from("user").update(props.payload).eq("id", props.userId).throwOnError();
    };

    return {
        fetchUser,
        updateUser,
    };
};
