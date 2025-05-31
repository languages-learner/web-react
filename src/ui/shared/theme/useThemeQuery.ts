import { useSearchParams } from "react-router";

import { type ApiEnums } from "@/shared/services/api";

export const getThemeQuery = () => {
    const params = new URLSearchParams(window.location.search);

    return params.get("theme") as ApiEnums<"Theme"> | null;
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
