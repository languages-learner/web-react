import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { ApiDatabase } from "@languages-learner/api";

export const supabase: SupabaseClient<ApiDatabase, "public", ApiDatabase["public"]> =
    createBrowserClient<ApiDatabase, "public">(
        import.meta.env.VITE_SUPABASE_PROJECT_URL,
        import.meta.env.VITE_SUPABASE_PROJECT_KEY,
    );
