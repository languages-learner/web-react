import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiConstants } from "../../types/database.types.public";
import type { ApiDatabase } from "../../types/database.types.public";

export class FetchWordsRequest {
    @ApiProperty({ description: "Language code", example: "en" })
    @IsString()
    language!: string;

    @ApiProperty({ description: "Number of items per page", example: 20 })
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    pageSize!: number;

    @ApiPropertyOptional({ description: "Page token for pagination", example: 10 })
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    @IsNumber()
    pageToken?: number;

    @ApiPropertyOptional({ description: "Filter by word text", example: "hello" })
    @IsOptional()
    @IsString()
    filterText?: string;

    @ApiPropertyOptional({
        description: "Filter by word status",
        enum: ApiConstants.public.Enums.UserWordStatus,
        example: ApiConstants.public.Enums.UserWordStatus[0],
    })
    @IsOptional()
    @IsEnum(ApiConstants.public.Enums.UserWordStatus)
    filterStatus?: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
}

// Response DTOs
export class TranslationResponseDto {
    @ApiProperty({ description: "Translation ID", example: "uuid" })
    id!: string;

    @ApiProperty({ description: "Translation text", example: "привет" })
    text!: string;

    @ApiProperty({ description: "Translation language code", example: "ru" })
    language!: string;
}

export class WordResponseDto {
    @ApiProperty({ description: "Word ID", example: "uuid" })
    id!: string;

    @ApiProperty({ description: "Creation timestamp", example: "2024-01-01T00:00:00Z" })
    created_at!: string;

    @ApiProperty({ description: "Update timestamp", example: "2024-01-01T00:00:00Z" })
    updated_at!: string;

    @ApiProperty({ description: "User ID", example: "uuid" })
    user_id!: string;

    @ApiProperty({ description: "Word language code", example: "en" })
    language!: string;

    @ApiProperty({ description: "Word text", example: "hello" })
    text!: string;

    @ApiProperty({ description: "Sort ID for ordering", example: 1 })
    sort_id!: number;

    @ApiProperty({
        description: "Word status",
        enum: ApiConstants.public.Enums.UserWordStatus,
        example: ApiConstants.public.Enums.UserWordStatus[0],
    })
    status!: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
}

export class WordWithTranslationsDto extends WordResponseDto {
    @ApiProperty({ type: [TranslationResponseDto], description: "Array of translations" })
    translations!: TranslationResponseDto[];
}

export class FetchWordsResponse {
    @ApiProperty({
        type: [WordWithTranslationsDto],
        description: "Array of words with translations",
    })
    words!: WordWithTranslationsDto[];

    @ApiProperty({
        type: Number,
        description: "Token for next page pagination",
        example: 10,
        nullable: true,
    })
    nextPageToken!: number | null;
}
