import { getThemeQuery, isResolvedTheme } from "../../shared/theme";
import type { Response } from "core";
import type { NextFunction, Request } from "express-serve-static-core";

import type { Theme } from "../../shared/project-config";

export const themeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    const systemTheme = req.cookies["system-theme"];

    const theme: Theme = res.locals.userSettings?.theme ?? getThemeQuery(`http:/${url}`);

    if (isResolvedTheme(theme)) {
        res.locals.theme = theme;
    } else {
        res.locals.theme = systemTheme;
    }

    next();
};
