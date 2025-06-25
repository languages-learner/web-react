import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types.generated";

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_PROJECT_URL,
    import.meta.env.VITE_SUPABASE_PROJECT_KEY,
);
