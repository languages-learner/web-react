import { type Response } from "core";
import { type NextFunction, type Request } from "express-serve-static-core";

import { type Theme } from "../../shared/project-config";
import { getThemeQuery, isResolvedTheme } from "../../shared/theme";

export const themeMiddleware = async function (req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;

    const systemTheme = req.cookies["system-theme"];

    const theme: Theme = res.locals?.userSettings?.theme ?? getThemeQuery(`http:/${url}`);

    if (isResolvedTheme(theme)) {
        // eslint-disable-next-line no-param-reassign
        res.locals.theme = theme;
    } else {
        // eslint-disable-next-line no-param-reassign
        res.locals.theme = systemTheme;
    }

    next();
};
