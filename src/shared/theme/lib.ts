import { ApiConstants, type ApiEnums } from "../services/api";

export const isResolvedTheme = (theme: string | null) => {
    return theme && theme !== "system"
        ? ApiConstants.public.Enums.Theme.includes(theme as ApiEnums<"Theme">)
        : false;
};

export const getThemeQuery = (url: string): ApiEnums<"Theme"> => {
    try {
        const params = new URL(url).searchParams;
        const theme = params.get("theme");

        return theme ? (params.get("theme") as ApiEnums<"Theme">) : "system";
    } catch {
        /* empty */
    }

    return "system";
};
