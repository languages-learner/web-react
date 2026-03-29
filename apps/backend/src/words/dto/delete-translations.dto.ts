import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TranslationResponseDto } from "./fetch-words.dto";

export class DeleteWordTranslationsRequest {
    @ApiProperty({
        type: [String],
        description: "Array of translation IDs to delete",
        example: ["uuid1", "uuid2"],
    })
    @IsArray()
    @IsString({ each: true })
    translationsIds!: string[];
}

export class DeleteWordTranslationsResponse {
    @ApiProperty({ type: [TranslationResponseDto], description: "Array of deleted translations" })
    translations!: TranslationResponseDto[];
}
