import { baseTailwindConfig } from "@languages-learner/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    ...baseTailwindConfig,
    content: [
        "./src/ui/**/*.{js,ts,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@languages-learner/uikit/src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@languages-learner/form-components/src/**/*.{js,ts,jsx,tsx}",
    ],
};
