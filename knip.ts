import type { KnipConfig } from "knip";

const config: KnipConfig = {
    entry: ["src/ui/app/entries/*.{js,ts,jsx,tsx}"],
    project: ["src/ui/**/*.{js,ts,jsx,tsx}"],
    // TODO: Fix paths problems (https://knip.dev/reference/known-issues)
    playwright: false,
};

export default config;
