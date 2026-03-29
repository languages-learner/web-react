import { IsArray, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { WordWithTranslationsDto } from "./fetch-words.dto";

class WordDto {
    @ApiProperty({ description: "Language code", example: "en" })
    language!: string;

    @ApiProperty({ description: "Word text", example: "hello" })
    text!: string;
}

class TranslationDto {
    @ApiProperty({ description: "Translation text", example: "привет" })
    text!: string;

    @ApiProperty({ description: "Translation language code", example: "ru" })
    language!: string;
}

export class CreateWordRequest {
    @ApiProperty({ type: WordDto, description: "Word information" })
    @IsObject()
    @ValidateNested()
    @Type(() => WordDto)
    word!: WordDto;

    @ApiProperty({ type: [TranslationDto], description: "Array of translations" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TranslationDto)
    translations!: TranslationDto[];
}

export class CreateWordResponse extends WordWithTranslationsDto {}
