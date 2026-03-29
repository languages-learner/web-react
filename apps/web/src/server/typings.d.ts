declare module "core" {
    import type { components } from "@languages-learner/api";
    import type { Response as BaseResponse } from "express-serve-static-core";

    import type { ResolvedTheme } from "../shared/project-config";
    import type { ApiDatabase } from "../shared/services/api";

    export interface Locals {
        user: components["schemas"]["GetUserResponse"];
        userSettings: ApiDatabase["public"]["Tables"]["user"]["Row"];
        locale: string;
        theme?: ResolvedTheme;
    }

    export interface Response extends BaseResponse {
        locals: Partial<Locals>;
    }
}
