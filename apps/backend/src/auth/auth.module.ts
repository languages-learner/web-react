import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { SupabaseModule } from "../supabase/supabase.module";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [SupabaseModule],
    exports: [SupabaseModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AuthModule {}
