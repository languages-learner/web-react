import React from "react";

import { ActionsPanel, withToasts } from "@languages-learner/uikit";
import type { WordWithTranslations } from "@languages-learner/api";
import type { ActionsPanelProps } from "@languages-learner/uikit";

import { WordStatusSelector, useWordMutations } from "@/entities/word";
import { intl } from "@/shared/i18n";

export interface WordsTableActionsPanelProps extends Pick<
    ActionsPanelProps,
    "className" | "style"
> {
    selectedWords: WordWithTranslations["translations"];
    onClose: () => unknown;
}

export const WordsTableActionsPanel: React.FC<WordsTableActionsPanelProps> = ({
    selectedWords,
    onClose,
    ...actionsPanelProps
}) => {
    const { updateWordsStatus } = useWordMutations();

    return (
        <ActionsPanel
            {...actionsPanelProps}
            onClose={onClose}
            actions={[
                <WordStatusSelector
                    classNames={{
                        trigger: "text-primary-foreground",
                    }}
                    key="update-status"
                    variant="button"
                    onUpdate={(status) => {
                        withToasts(
                            updateWordsStatus.mutateAsync({
                                wordsIds: selectedWords.map((word) => word.id),
                                status: status,
                            }),
                            {
                                success: "Words statuses successfully updated!",
                                error: "Words statuses update error",
                            },
                        );
                    }}
                />,
            ]}
            note={intl.formatMessage(
                {
                    defaultMessage: "{count} words",
                    id: "2E0SZe",
                },
                { count: selectedWords.length },
            )}
        />
    );
};
