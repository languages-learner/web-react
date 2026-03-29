import { createSdk } from "@languages-learner/api";
import { supabase } from "./supabase";

export const sdk = createSdk(supabase);
