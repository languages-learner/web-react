import { HeroUIProvider } from "@heroui/system";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";

import { ToasterProvider } from "../../../src/ui/shared/ui";

import "./style.css";

beforeMount(async ({ App }) => {
    return (
        <HeroUIProvider>
            <ToasterProvider>
                <App />
            </ToasterProvider>
        </HeroUIProvider>
    );
});
