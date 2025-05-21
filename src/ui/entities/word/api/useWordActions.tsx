import { useDataManager } from "@gravity-ui/data-source";
import { useMutation } from "@tanstack/react-query";

import { wordsDataSource } from "@/entities/word";
import { type ApiDatabase, supabase } from "@/shared/services/api";

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
            await supabase
                .from("words")
                .update({ status: props.status })
                .eq("id", props.word.id);
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
