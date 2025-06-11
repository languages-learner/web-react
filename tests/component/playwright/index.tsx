import { ThemeProvider, configure } from "@gravity-ui/uikit";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";

import { ToasterProvider } from "../../../src/ui/shared/ui";

import "../../../src/ui/app/styles/gravity-imports.scss";
import "../../../src/ui/app/styles/gravity-theme.scss";
import "../../../src/ui/app/styles/reset.scss";

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
