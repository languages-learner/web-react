import { HeroUIProvider } from "@heroui/system";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";

import "./style.css";

beforeMount(async ({ App }) => {
    return (
        <HeroUIProvider>
            <App />
        </HeroUIProvider>
    );
});
