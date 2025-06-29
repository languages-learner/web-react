import { type ApiTables } from "./services/api";

export const INTERFACE_LOCALES = ["en", "ru"] as const;
export type InterfaceLocale = (typeof INTERFACE_LOCALES)[number];
export const BASE_INTERFACE_LOCALE: InterfaceLocale = "en" as const;

export type ResolvedTheme = Exclude<ApiTables<"user">["theme"], "system">;
export type Theme = ApiTables<"user">["theme"];
export const BASE_THEME: ApiTables<"user">["theme"] = "system";
export const BASE_RESOLVED_THEME: ResolvedTheme = "light";
