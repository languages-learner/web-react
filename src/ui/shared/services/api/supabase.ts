import { createBrowserClient } from "@supabase/ssr";

import type { ApiDatabase } from "shared/services/api";

export const supabase = createBrowserClient<ApiDatabase>(
    import.meta.env.VITE_SUPABASE_PROJECT_URL,
    import.meta.env.VITE_SUPABASE_PROJECT_KEY,
);
