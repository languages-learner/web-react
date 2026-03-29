import { Module } from "@nestjs/common";
import { SupabaseClientModule } from "../supabase-client/supabase-client.module";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";

@Module({
    imports: [SupabaseClientModule],
    controllers: [WordsController],
    providers: [WordsService],
})
export class WordsModule {}
