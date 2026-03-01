import { baseTailwindConfig } from "@languages-learner/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    ...baseTailwindConfig,
    content: [
        "../web/src/ui/**/*.{js,ts,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
        "../../packages/uikit/src/**/*.{js,ts,jsx,tsx}",
        "../../packages/form-components/src/**/*.{js,ts,jsx,tsx}",
    ],
};
