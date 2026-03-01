import { heroui } from "@heroui/theme/plugin";

/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [
        heroui({
            prefix: "app",
            layout: {
                borderWidth: {
                    medium: "1px",
                },
                radius: {
                    small: "0.4rem",
                    medium: "0.5rem",
                },
            },
            themes: {
                light: {
                    colors: {
                        background: "rgb(255,255,255)",
                        foreground: "rgba(0, 0, 0, 0.85)",
                        overlay: "rgb(78,116,92)",
                        focus: "rgb(78,116,92)",
                        content1: "rgb(255,255,255)",
                        default: {
                            200: "rgba(0, 0, 0, 0.85)",
                        },
                        primary: {
                            600: "rgb(27,121,72)",
                            foreground: "rgb(255,255,255)",
                            DEFAULT: "#18A058",
                        },
                        success: {
                            DEFAULT: "rgb(48, 170, 110)",
                            foreground: "rgb(255,255,255)",
                        },
                        warning: {
                            DEFAULT: "rgb(245, 164, 42)",
                            foreground: "rgb(255,255,255)",
                        },
                        danger: {
                            DEFAULT: "rgb(229, 50, 93)",
                            foreground: "rgb(255,255,255)",
                        },
                    },
                },
                dark: {
                    colors: {
                        background: "rgb(34,29,34)", // the page background color
                        foreground: "rgb(255,255,255)", // the page text color
                        overlay: "rgb(78,116,92)", // used for modal, popover, etc.
                        focus: "rgb(78,116,92)", // used for focus state outline
                        content1: "rgb(38, 34, 38)", // used for card, modal, popover, etc.
                        default: {
                            200: "rgba(255, 255, 255, 0.15)", // Button border color
                        },
                        primary: {
                            600: "rgb(117,147,128)", // Flat button text color
                            DEFAULT: "rgb(78,116,92)",
                        },
                        success: {
                            DEFAULT: "rgb(77, 176, 155)",
                        },
                        warning: {
                            DEFAULT: "rgb(255, 190, 92)",
                        },
                        danger: {
                            DEFAULT: "rgb(229, 50, 93)",
                        },
                    },
                },
            },
        }),
    ],
};
