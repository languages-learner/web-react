import { useDataManager } from "@gravity-ui/data-source";
import { useMutation } from "@tanstack/react-query";

import { sdk } from "@/shared/services/api";

import { userDataSource } from "../queries/user";

export const useUserMutations = () => {
    const dataManager = useDataManager();

    const updateUser = useMutation({
        mutationFn: sdk.user.updateUser,
        onSuccess: () => {
            dataManager.invalidateSource(userDataSource);
        },
    });

    return {
        updateUser,
    };
};
