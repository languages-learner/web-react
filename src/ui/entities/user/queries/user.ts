import { makePlainQuery } from "@/shared/data-source";
import { supabase } from "@/shared/services/api";

export const userDataSource = makePlainQuery({
    name: "user",
    fetch: async () => {
        return await supabase.from("user").select().single();
    },
    transformResponse: (response) => {
        return response.data;
    },
});
