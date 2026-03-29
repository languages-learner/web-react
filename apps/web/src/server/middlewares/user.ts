import { useSdk } from "../shared/sdk";
import type { Response } from "core";
import type { NextFunction, Request } from "express-serve-static-core";

export const userMiddleware = async function (req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { sdk } = useSdk(req, res);

    try {
        const user = await sdk.user.fetchUser();
        res.locals.user = user;
    } catch {
        // TODO: use logger
    }

    // Note: userSettings are now fetched on the client side via API
    // This middleware only handles user authentication for SSR
    // If you need userSettings in SSR, you can fetch them from backend API here
    // by making an HTTP request to /api/user with the auth token

    next();
};
