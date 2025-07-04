import { type Response } from "core";
import { type NextFunction, type Request } from "express-serve-static-core";

import { useSdk } from "../shared/sdk";
import { useSupabaseClient } from "../shared/supabase";

// oxlint-disable-next-line rules-of-hooks
export const userMiddleware = async function (req: Request, res: Response, next: NextFunction) {
    const { supabaseClient } = useSupabaseClient(req, res);
    const { sdk } = useSdk(req, res);

    try {
        const user = await supabaseClient.auth.getUser();
        if (user.data.user) {
            // eslint-disable-next-line no-param-reassign
            res.locals.user = user.data.user;
        }
    } catch {
        // TODO: use logger
    }

    try {
        const userSettings = await sdk.user.fetchUser();
        // eslint-disable-next-line no-param-reassign
        res.locals.userSettings = userSettings;
    } catch {
        /* empty */
    }

    next();
};
