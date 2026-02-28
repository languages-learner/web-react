declare module "core" {
    import type { User } from "@supabase/supabase-js";
    import type { Response as BaseResponse } from "express-serve-static-core";

    import type { ResolvedTheme } from "../shared/project-config";
    import type { ApiDatabase } from "../shared/services/api";

    export interface Locals {
        user: User;
        userSettings: ApiDatabase["public"]["Tables"]["user"]["Row"];
        locale: string;
        theme?: ResolvedTheme;
    }

    export interface Response extends BaseResponse {
        locals: Partial<Locals>;
    }
}
