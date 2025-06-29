import { type Response } from "core";
import { type NextFunction, type Request } from "express-serve-static-core";

import { getLocaleFromPath } from "../../shared/locale";
import { BASE_INTERFACE_LOCALE } from "../../shared/project-config";

export const localeMiddleware = async function (req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;

    res.locals.locale =
        // TODO: redirect to url with user interface language if not match
        res.locals?.userSettings?.interface_language ??
        getLocaleFromPath(url) ??
        BASE_INTERFACE_LOCALE;

    next();
};
