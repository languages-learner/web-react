import { getLocaleFromPath } from "@languages-learner/locale";
import { BASE_INTERFACE_LOCALE, INTERFACE_LOCALES } from "../../shared/project-config";
import type { Response } from "core";
import type { NextFunction, Request } from "express-serve-static-core";

export const localeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    res.locals.locale =
        // TODO: redirect to url with user interface language if not match
        res.locals.userSettings?.interface_language ??
        getLocaleFromPath({ path: url, availableLocales: INTERFACE_LOCALES }) ??
        BASE_INTERFACE_LOCALE;

    next();
};
