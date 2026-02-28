import { useMutation } from "@tanstack/react-query";

import { sdk } from "@/shared/services/api";

export const useUserMutations = () => {
    const updateUser = useMutation({
        mutationFn: sdk.user.updateUser,
    });

    return {
        updateUser,
    };
};
