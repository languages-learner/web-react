import { useSearchParams } from "react-router";
import { getThemeQuery as baseGetThemeQuery } from "shared/theme";
import type { ApiEnums } from "@languages-learner/api";

export const getThemeQuery = () => {
    return baseGetThemeQuery(window.location.href);
};

export const useThemeQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const theme = searchParams.get("theme") as ApiEnums<"Theme"> | null;

    const setTheme = (newTheme: ApiEnums<"Theme">) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("theme", newTheme);
        setSearchParams(newParams);
    };

    const clearTheme = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("theme");
        setSearchParams(newParams);
    };

    return { theme, setTheme, clearTheme };
};
