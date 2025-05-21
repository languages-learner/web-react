import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/shared/services/api/database.types";

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_PROJECT_URL,
    import.meta.env.VITE_SUPABASE_PROJECT_KEY,
);
