import { Global, Module, Scope, UnauthorizedException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { SupabaseModule } from "../supabase/supabase.module";
import { SupabaseService } from "../supabase/supabase.service";
import { SUPABASE_USER_CLIENT } from "./supabase-user-client.token";
import type { Request } from "express";

@Global()
@Module({
    imports: [SupabaseModule],
    providers: [
        {
            provide: SUPABASE_USER_CLIENT,
            useFactory: (req: Request, supabaseService: SupabaseService) => {
                // First, try to get token from req.accessToken (set by AuthGuard)
                // If not available, extract from Authorization header directly
                let token = (req as Request & { accessToken?: string }).accessToken;

                if (!token) {
                    // Extract token from Authorization header (same logic as AuthGuard)
                    const [type, extractedToken] = req.headers.authorization?.split(" ") ?? [];
                    if (type === "Bearer" && extractedToken) {
                        token = extractedToken;
                    }
                }

                if (!token) {
                    throw new UnauthorizedException(
                        "No access token provided. Please include Authorization header with Bearer token.",
                    );
                }

                return supabaseService.getClientForUser(token);
            },
            inject: [REQUEST, SupabaseService],
            scope: Scope.REQUEST,
        },
    ],
    exports: [SUPABASE_USER_CLIENT],
})
export class SupabaseClientModule {}
