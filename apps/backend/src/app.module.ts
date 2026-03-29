import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { WordsModule } from "./words/words.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { AuthModule } from "./auth/auth.module";
import { SupabaseClientModule } from "./supabase-client/supabase-client.module";

@Module({
    imports: [SupabaseModule, AuthModule, SupabaseClientModule, UserModule, WordsModule],
    controllers: [AppController],
})
export class AppModule {}
