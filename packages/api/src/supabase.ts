import type { SupabaseClient as BaseSupabaseClient } from "@supabase/supabase-js";

import type { ApiDatabase } from "./database.types.public";

export type SupabaseClient = BaseSupabaseClient<ApiDatabase, "public">;
