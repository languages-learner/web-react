import type { ApiEnums } from "@languages-learner/api";

export const INTERFACE_LOCALES = ["en", "ru"] as const;
export type InterfaceLocale = (typeof INTERFACE_LOCALES)[number];
export const BASE_INTERFACE_LOCALE: InterfaceLocale = "en" as const;

export type ResolvedTheme = Exclude<ApiEnums<"Theme">, "system">;
export type Theme = ApiEnums<"Theme">;
export const BASE_THEME: ApiEnums<"Theme"> = "system";
export const BASE_RESOLVED_THEME: ResolvedTheme = "light";
