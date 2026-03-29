import { Module } from "@nestjs/common";
import { SupabaseClientModule } from "../supabase-client/supabase-client.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [SupabaseClientModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
