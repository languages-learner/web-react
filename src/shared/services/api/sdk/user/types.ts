import { type ApiDatabase } from "../../database.types.public";

export type FetchUserResponse = ApiDatabase["public"]["Tables"]["user"]["Row"];

export interface UpdateUserParams {
    userId: string;
    payload: Partial<Omit<ApiDatabase["public"]["Tables"]["user"]["Row"], "id">>;
}
