import { makePlainQuery } from "@/shared/data-source";
import { sdk } from "@/shared/services/api";

export const userDataSource = makePlainQuery({
    name: "user",
    fetch: sdk.user.fetchUser,
});
