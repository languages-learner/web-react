import { Inject, Injectable } from "@nestjs/common";
import { SUPABASE_USER_CLIENT } from "../supabase-client/supabase-user-client.token";
import type { SupabaseUserClient } from "../supabase-client/supabase-user-client.token";
import type { UpdateUserRequest } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(@Inject(SUPABASE_USER_CLIENT) private readonly supabase: SupabaseUserClient) {}

    async fetchUser(userId: string) {
        const response = await this.supabase
            .from("user")
            .select()
            .eq("id", userId)
            .maybeSingle()
            .throwOnError();

        return response.data;
    }

    async updateUser(userId: string, dto: UpdateUserRequest) {
        const response = await this.supabase
            .from("user")
            .update(dto.payload)
            .eq("id", userId)
            .select()
            .maybeSingle()
            .throwOnError();

        return response.data;
    }
}
