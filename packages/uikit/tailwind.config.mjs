import { baseTailwindConfig } from "@languages-learner/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    ...baseTailwindConfig,
    content: ["./src/**/*.{js,ts,tsx}", "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
};
