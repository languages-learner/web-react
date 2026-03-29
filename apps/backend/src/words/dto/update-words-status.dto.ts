import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ApiConstants } from "../../types/database.types.public";
import { WordResponseDto } from "./fetch-words.dto";
import type { ApiDatabase } from "../../types/database.types.public";

export class UpdateWordsStatusRequest {
    @ApiProperty({ type: [String], description: "Array of word IDs", example: ["uuid1", "uuid2"] })
    @IsArray()
    @IsString({ each: true })
    wordsIds!: string[];

    @ApiProperty({
        description: "New status for words",
        enum: ApiConstants.public.Enums.UserWordStatus,
        example: ApiConstants.public.Enums.UserWordStatus[0],
    })
    status!: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
}

export class UpdateWordsStatusResponse {
    @ApiProperty({ type: [WordResponseDto], description: "Array of updated words" })
    words!: WordResponseDto[];
}
