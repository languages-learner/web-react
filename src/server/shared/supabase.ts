import { createServerClient } from "@supabase/ssr";
import { type Response } from "core";
import { type Request } from "express-serve-static-core";

import { type ApiDatabase } from "../../shared/services/api";

export const useSupabaseClient = (req: Request, res: Response) => {
    const supabaseClient = createServerClient<ApiDatabase>(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.VITE_SUPABASE_PROJECT_URL!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.VITE_SUPABASE_PROJECT_KEY!,
        {
            cookies: {
                getAll() {
                    const cookies: Record<string, string> = req.cookies;

                    return Object.entries(cookies).map(([name, value]) => ({ name, value }));
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            res.cookie(name, value, options);
                        });
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );

    return { supabaseClient };
};
