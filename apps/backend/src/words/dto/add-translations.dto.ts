import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { TranslationResponseDto } from "./fetch-words.dto";

class TranslationDto {
    @ApiProperty({ description: "Translation text", example: "привет" })
    text!: string;

    @ApiProperty({ description: "Translation language code", example: "ru" })
    language!: string;
}

export class AddWordTranslationsRequest {
    @ApiProperty({ type: [TranslationDto], description: "Array of translations to add" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TranslationDto)
    translations!: TranslationDto[];
}

export class AddWordTranslationsResponse {
    @ApiProperty({ type: [TranslationResponseDto], description: "Array of added translations" })
    translations!: TranslationResponseDto[];
}
