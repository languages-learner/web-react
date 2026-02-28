import { createUserActions } from "./user";
import { createWordsActions } from "./words";
import type { SupabaseClient } from "../supabase";

export const createSdk = (supabase: SupabaseClient) => {
    return {
        get user() {
            return createUserActions(supabase);
        },
        get words() {
            return createWordsActions(supabase);
        },
    };
};
