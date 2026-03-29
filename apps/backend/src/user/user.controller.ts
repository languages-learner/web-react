import { Body, Controller, Get, Patch, Request } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { UserService } from "./user.service";
import {
    GetUserResponse,
    UpdateUserPayloadDto,
    UpdateUserRequest,
    UpdateUserResponse,
} from "./dto/update-user.dto";

@ApiTags("user")
@ApiBearerAuth()
@ApiExtraModels(UpdateUserPayloadDto, UpdateUserResponse, GetUserResponse)
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: "Get current user" })
    @ApiResponse({
        status: 200,
        type: GetUserResponse,
        // nullable: true,
        description: "User retrieved successfully",
    })
    async getUser(@Request() req: any) {
        return this.userService.fetchUser(req.user.id);
    }

    @Patch()
    @ApiOperation({ summary: "Update current user" })
    @ApiBody({ type: UpdateUserRequest })
    @ApiResponse({
        status: 200,
        type: UpdateUserResponse,
        // nullable: true,
        description: "User updated successfully",
    })
    async updateUser(@Request() req: any, @Body() dto: UpdateUserRequest) {
        console.log(req.user, dto, "dto");

        return this.userService.updateUser(req.user.id, dto);
    }
}
