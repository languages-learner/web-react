import { ThemeProvider, configure } from "@gravity-ui/uikit";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";

import { ToasterProvider } from "../../../src/ui/shared/ui";

import "../../../src/ui/app/styles/gravity-imports.css";
import "../../../src/ui/app/styles/gravity-theme.css";
import "../../../src/ui/app/styles/reset.css";

configure({
    lang: "en",
});

beforeMount(async ({ App }) => {
    return (
        <ThemeProvider>
            <ToasterProvider>
                <App />
            </ToasterProvider>
        </ThemeProvider>
    );
});
