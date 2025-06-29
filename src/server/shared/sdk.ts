import { type Response } from "core";
import { type Request } from "express-serve-static-core";

import { createSdk } from "../../shared/services/api";

import { useSupabaseClient } from "./supabase";

export const useSdk = (req: Request, res: Response) => {
    const { supabaseClient } = useSupabaseClient(req, res);

    return { sdk: createSdk(supabaseClient) };
};
