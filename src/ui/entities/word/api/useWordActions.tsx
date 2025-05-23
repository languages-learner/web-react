import { useDataManager } from "@gravity-ui/data-source";
import { useMutation } from "@tanstack/react-query";

import { wordsDataSource } from "@/entities/word";
import { type ApiDatabase, sdk } from "@/shared/services/api";

interface BaseWordActionsProps {
    word: ApiDatabase["public"]["Tables"]["words"]["Row"];
}

interface UpdateWordStatusProps extends BaseWordActionsProps {
    onUpdate?: () => unknown;
    status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
}

export const useWordActions = () => {
    const dataManager = useDataManager();

    const wordStatusMutation = useMutation({
        mutationFn: async (props: UpdateWordStatusProps) => {
            return await sdk.words.updateWordStatus({
                wordId: props.word.id,
                status: props.status,
            });
        },
        onSuccess: () => {
            dataManager.invalidateSource(wordsDataSource);
        },
    });

    return {
        updateWordStatus: (props: UpdateWordStatusProps) => {
            return wordStatusMutation.mutateAsync(props);
        },
    };
};
