import { supabase } from "@/shared/services/api";

import { type FetchUserResponse, type UpdateUserParams } from "./types";

export const fetchUser = async (): Promise<FetchUserResponse> => {
    const response = await supabase
        .from("user")
        .select()
        .single()
        .throwOnError();

    return response.data;
};

export const updateUser = async (props: UpdateUserParams) => {
    await supabase
        .from("user")
        .update(props.payload)
        .eq("id", props.userId)
        .throwOnError();
};
