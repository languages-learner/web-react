import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { SupabaseService } from "../supabase/supabase.service";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Check if route is marked as public
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();

        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException("No token provided");
        }

        try {
            const supabase = this.supabaseService.getClient();
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser(token);

            if (error || !user) {
                throw new UnauthorizedException("Invalid token");
            }

            // Add user and access token to request (token needed for Supabase RLS)
            (request as any).user = {
                id: user.id,
                email: user.email,
            };
            (request as any).accessToken = token;

            return true;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException("Invalid token");
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }
}
