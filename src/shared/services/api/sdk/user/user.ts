import { type SupabaseClient } from "../../supabase";

import { type UpdateUserParams } from "./types";

export const createUserActions = (supabase: SupabaseClient) => {
    const fetchUser = async () => {
        const response = await supabase.from("user").select().single().throwOnError();

        return response.data;
    };

    const updateUser = async (props: UpdateUserParams) => {
        const response = await supabase
            .from("user")
            .update(props.payload)
            .eq("id", props.userId)
            .select()
            .single()
            .throwOnError();

        return response.data;
    };

    return {
        fetchUser,
        updateUser,
    };
};
