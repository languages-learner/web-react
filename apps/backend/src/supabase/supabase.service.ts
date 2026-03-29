import { Injectable } from "@nestjs/common";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import type { ApiDatabase } from "../types/database.types.public";

@Injectable()
export class SupabaseService {
    private client: SupabaseClient<ApiDatabase>;
    private readonly supabaseUrl: string;
    private readonly supabaseKey: string;

    constructor() {
        this.supabaseUrl =
            process.env.SUPABASE_PROJECT_URL || process.env.VITE_SUPABASE_PROJECT_URL || "";
        this.supabaseKey =
            process.env.SUPABASE_PROJECT_KEY || process.env.VITE_SUPABASE_PROJECT_KEY || "";

        if (!this.supabaseUrl || !this.supabaseKey) {
            throw new Error("Supabase URL and Key must be provided");
        }

        this.client = createClient<ApiDatabase>(this.supabaseUrl, this.supabaseKey);
    }

    getClient(): SupabaseClient<ApiDatabase> {
        return this.client;
    }

    /**
     * Returns a Supabase client configured with the user's JWT.
     * Use this for queries that must respect RLS policies (user can only access their own data).
     * Uses anon key so RLS applies; service role key bypasses RLS.
     */
    getClientForUser(accessToken: string): SupabaseClient<ApiDatabase> {
        const anonKey =
            process.env.SUPABASE_ANON_KEY ||
            process.env.VITE_SUPABASE_PROJECT_KEY ||
            this.supabaseKey;

        return createClient<ApiDatabase>(this.supabaseUrl, anonKey, {
            global: {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        });
    }
}
