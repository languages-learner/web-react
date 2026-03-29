import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { WordsService } from "./words.service";
import {
    FetchWordsRequest,
    FetchWordsResponse,
    TranslationResponseDto,
    WordResponseDto,
    WordWithTranslationsDto,
} from "./dto/fetch-words.dto";
import { UpdateWordsStatusRequest, UpdateWordsStatusResponse } from "./dto/update-words-status.dto";
import { CreateWordRequest, CreateWordResponse } from "./dto/create-word.dto";
import {
    AddWordTranslationsRequest,
    AddWordTranslationsResponse,
} from "./dto/add-translations.dto";
import {
    DeleteWordTranslationsRequest,
    DeleteWordTranslationsResponse,
} from "./dto/delete-translations.dto";
import { DeleteWordsRequest, DeleteWordsResponse } from "./dto/delete-words.dto";

@ApiTags("words")
@ApiBearerAuth()
@ApiExtraModels(
    FetchWordsResponse,
    CreateWordResponse,
    UpdateWordsStatusResponse,
    DeleteWordsResponse,
    AddWordTranslationsResponse,
    DeleteWordTranslationsResponse,
    WordResponseDto,
    TranslationResponseDto,
    WordWithTranslationsDto,
)
@Controller("words")
export class WordsController {
    constructor(private readonly wordsService: WordsService) {}

    @Get()
    @ApiOperation({ summary: "Get words" })
    @ApiQuery({ type: FetchWordsRequest })
    @ApiResponse({
        status: 200,
        type: FetchWordsResponse,
        description: "Words retrieved successfully",
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async getWords(@Query() dto: FetchWordsRequest, @Request() req: any) {
        return this.wordsService.fetchWords(dto, req.user.id);
    }

    @Post()
    @ApiOperation({ summary: "Create word" })
    @ApiBody({ type: CreateWordRequest })
    @ApiResponse({
        status: 201,
        type: CreateWordResponse,
        description: "Word created successfully",
    })
    async createWord(@Body() dto: CreateWordRequest, @Request() req: any) {
        return this.wordsService.createWord(dto, req.user.id);
    }

    @Patch("status")
    @ApiOperation({ summary: "Update words status" })
    @ApiBody({ type: UpdateWordsStatusRequest })
    @ApiResponse({
        status: 200,
        type: UpdateWordsStatusResponse,
        description: "Words status updated successfully",
    })
    async updateWordsStatus(@Body() dto: UpdateWordsStatusRequest, @Request() req: any) {
        return this.wordsService.updateWordsStatus(dto, req.user.id);
    }

    @Delete()
    @ApiOperation({ summary: "Delete words" })
    @ApiBody({ type: DeleteWordsRequest })
    @ApiResponse({
        status: 200,
        type: DeleteWordsResponse,
        description: "Words deleted successfully",
    })
    async deleteWords(@Body() dto: DeleteWordsRequest, @Request() req: any) {
        return this.wordsService.deleteWords(dto, req.user.id);
    }

    @Post(":wordId/translations")
    @ApiOperation({ summary: "Add translations to word" })
    @ApiParam({ name: "wordId", description: "Word ID", example: "uuid" })
    @ApiBody({ type: AddWordTranslationsRequest })
    @ApiResponse({
        status: 201,
        type: AddWordTranslationsResponse,
        description: "Translations added successfully",
    })
    async addWordTranslations(
        @Param("wordId") wordId: string,
        @Body() dto: AddWordTranslationsRequest,
        @Request() req: any,
    ) {
        return this.wordsService.addWordTranslations(wordId, dto, req.user.id);
    }

    @Delete(":wordId/translations")
    @ApiOperation({ summary: "Delete translations from word" })
    @ApiParam({ name: "wordId", description: "Word ID", example: "uuid" })
    @ApiBody({ type: DeleteWordTranslationsRequest })
    @ApiResponse({
        status: 200,
        type: DeleteWordTranslationsResponse,
        description: "Translations deleted successfully",
    })
    async deleteWordTranslations(
        @Param("wordId") wordId: string,
        @Body() dto: DeleteWordTranslationsRequest,
        @Request() req: any,
    ) {
        return this.wordsService.deleteWordTranslations(wordId, dto, req.user.id);
    }
}
