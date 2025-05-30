import { makeRoutesWithLocale } from "./lib";

export const appRoutes = makeRoutesWithLocale({
    root: "/",
    landing: "/",
    workspace: "/workspace",
    office: "/office",
} as const);

export const landingRoutes = {
    root: appRoutes.landing,
} as const;

export const workspaceRoutes = {
    root: appRoutes.workspace,
    dictionary: `${appRoutes.workspace}/dictionary`,
} as const;

export const officeRoutes = {
    root: appRoutes.office,
    profile: `${appRoutes.office}/profile`,
    settings: `${appRoutes.office}/settings`,
} as const;
