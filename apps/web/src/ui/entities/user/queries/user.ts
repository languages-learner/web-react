import { makePlainQuery } from "@languages-learner/data-source";

import { sdk } from "@/shared/services/api";

export const userDataSource = makePlainQuery({
    name: "user",
    fetch: sdk.user.fetchUser,
});
