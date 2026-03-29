import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { WordResponseDto } from "./fetch-words.dto";

export class DeleteWordsRequest {
    @ApiProperty({
        type: [String],
        description: "Array of word IDs to delete",
        example: ["uuid1", "uuid2"],
    })
    @IsArray()
    @IsString({ each: true })
    wordIds!: string[];
}

export class DeleteWordsResponse {
    @ApiProperty({ type: [WordResponseDto], description: "Array of deleted words" })
    words!: WordResponseDto[];
}
