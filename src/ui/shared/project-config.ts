import { type ApiTables } from "@/shared/services/api";

export const INTERFACE_LOCALES = ["en", "ru"] as const;
export type InterfaceLocale = (typeof INTERFACE_LOCALES)[number];
export const BASE_INTERFACE_LOCALE: InterfaceLocale = "en" as const;

export const BASE_THEME: ApiTables<"user">["theme"] = "system";
