import { createSdk } from "shared/services/api";

import { supabase } from "./supabase";

export const sdk = createSdk(supabase);
