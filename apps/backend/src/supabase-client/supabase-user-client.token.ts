import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApiDatabase } from "../types/database.types.public";

export const SUPABASE_USER_CLIENT = Symbol("SUPABASE_USER_CLIENT");

export type SupabaseUserClient = SupabaseClient<ApiDatabase>;
