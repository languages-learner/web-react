import { type SupabaseClient } from "@supabase/supabase-js";

import { createUserActions } from "./user";
import { createWordsActions } from "./words";

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
