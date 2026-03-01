import React from "react";

import { useTheme } from "@heroui/use-theme";

export interface ThemeProviderProps extends React.PropsWithChildren {
    theme: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
    const { setTheme } = useTheme();

    React.useEffect(() => {
        setTheme(theme);
    }, [theme, setTheme]);

    return children;
};
