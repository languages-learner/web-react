import { createSdk } from "@languages-learner/api";
import { useSupabaseClient } from "./supabase";
import type { Response } from "core";
import type { Request } from "express-serve-static-core";

export const useSdk = (req: Request, res: Response) => {
    const { supabaseClient } = useSupabaseClient(req, res);

    return { sdk: createSdk(supabaseClient) };
};
