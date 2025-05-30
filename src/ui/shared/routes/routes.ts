import { makeRoutesWithLocale } from "./lib";

export const landingRoutes = makeRoutesWithLocale({
    root: "/",
} as const);

export const workspaceRoutes = makeRoutesWithLocale({
    root: "/workspace/",
    dictionary: "/workspace/dictionary",
} as const);
