import React from "react";

import { PencilToSquare } from "@gravity-ui/icons";
import { ActionsPanel, type ButtonButtonProps, Icon, Menu, Popup } from "@gravity-ui/uikit";

import { WORD_STATUS_NAME, useWordMutations } from "@/entities/word";
import { ApiConstants, type WordWithTranslations } from "@/shared/services/api";
import { withToasts } from "@/shared/ui";

export interface WordsTableActionsPanelProps {
    selectedWords: WordWithTranslations["translations"];
    onClose: () => unknown;
    className?: string;
}

export const WordsTableActionsPanel: React.FC<WordsTableActionsPanelProps> = ({
    selectedWords,
    onClose,
    className,
}) => {
    const [open, setOpen] = React.useState(false);
    const [buttonElement, setButtonElement] = React.useState(null);

    const { updateWordsStatus } = useWordMutations();

    return (
        <React.Fragment>
            <ActionsPanel
                onClose={onClose}
                className={className}
                actions={[
                    {
                        id: "action_2",
                        button: {
                            props: {
                                children: [
                                    <Icon key="icon" data={PencilToSquare} />,
                                    "Update status",
                                ],
                                onClick: () => setOpen((prev) => !prev),
                                ref: setButtonElement,
                            } as ButtonButtonProps,
                        },
                        // TODO
                        dropdown: {
                            item: {
                                // eslint-disable-next-line no-console
                                action: () => console.log("click dropdown action 1"),
                                text: "Action 1",
                            },
                        },
                    },
                ]}
                renderNote={() => `${selectedWords.length} words`}
            />
            <Popup
                anchorElement={buttonElement}
                open={open}
                placement="bottom"
                onOpenChange={(value) => setOpen(value)}
            >
                <Menu>
                    {ApiConstants.public.Enums.UserWordStatus.map((wordStatus) => (
                        <Menu.Item
                            key={wordStatus}
                            onClick={() => {
                                withToasts(
                                    updateWordsStatus.mutateAsync({
                                        wordsIds: selectedWords.map((word) => word.id),
                                        status: wordStatus,
                                    }),
                                    {
                                        name: "wordsTableUpdateStatuses",
                                        success: "Words statuses successfully updated!",
                                        error: "Words statuses update error",
                                    },
                                );
                                setOpen(false);
                            }}
                        >
                            {WORD_STATUS_NAME[wordStatus]}
                        </Menu.Item>
                    ))}
                </Menu>
            </Popup>
        </React.Fragment>
    );
};
