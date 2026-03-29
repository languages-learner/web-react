import { IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiConstants } from "../../types/database.types.public";
import type { ApiDatabase } from "../../types/database.types.public";

export class UpdateUserPayloadDto {
    @ApiPropertyOptional({ description: "Active learning language code", example: "en" })
    @IsOptional()
    @IsString()
    active_learning_language?: string;

    @ApiPropertyOptional({ description: "Interface language code", example: "en" })
    @IsOptional()
    @IsString()
    interface_language?: string;

    @ApiPropertyOptional({ description: "Native language code", example: "ru" })
    @IsOptional()
    @IsString()
    native_language?: string;

    @ApiPropertyOptional({
        description: "Theme preference",
        enum: ApiConstants.public.Enums.Theme,
        example: ApiConstants.public.Enums.Theme[0],
    })
    @IsOptional()
    @IsEnum(ApiConstants.public.Enums.Theme)
    theme?: ApiDatabase["public"]["Enums"]["Theme"];
}

export class UpdateUserRequest {
    @ApiProperty({ type: UpdateUserPayloadDto, description: "Partial user data to update" })
    @IsObject()
    payload!: UpdateUserPayloadDto;
}

// Response DTOs
export class UpdateUserResponse {
    @ApiProperty({ description: "User ID", example: "uuid" })
    id!: string;

    @ApiProperty({ description: "Active learning language code", example: "en" })
    active_learning_language!: string;

    @ApiProperty({ description: "Interface language code", example: "en" })
    interface_language!: string;

    @ApiProperty({ description: "Native language code", example: "ru" })
    native_language!: string;

    @ApiProperty({
        description: "Theme preference",
        enum: ApiConstants.public.Enums.Theme,
        example: ApiConstants.public.Enums.Theme[0],
    })
    theme!: ApiDatabase["public"]["Enums"]["Theme"];
}

export class GetUserResponse extends UpdateUserResponse {}
