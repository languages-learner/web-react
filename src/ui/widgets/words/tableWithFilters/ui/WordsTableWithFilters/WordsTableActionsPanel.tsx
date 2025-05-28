import React from "react";

import { PencilToSquare } from "@gravity-ui/icons";
import { ActionsPanel, type ButtonButtonProps, Icon, Menu, Popup, Portal } from "@gravity-ui/uikit";

import { WORD_STATUS_NAME, useWordMutations } from "@/entities/word";
import { block } from "@/shared/classNames";
import { ApiConstants, type WordWithTranslations } from "@/shared/services/api";

import "./WordsTableActionsPanel.scss";

export interface WordsTableActionsPanelProps {
    selectedWords: WordWithTranslations["translations"];
}

const b = block("WordsTableActionsPanel");

export const WordsTableActionsPanel: React.FC<WordsTableActionsPanelProps> = ({
    selectedWords,
}) => {
    const [open, setOpen] = React.useState(false);
    const [buttonElement, setButtonElement] = React.useState(null);

    const { updateWordsStatus } = useWordMutations();

    return selectedWords.length > 0 ? (
        <React.Fragment>
            <Portal disablePortal>
                <ActionsPanel
                    className={b()}
                    actions={[
                        {
                            id: "action_1",
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
                                    updateWordsStatus.mutateAsync({
                                        wordsIds: selectedWords.map((word) => word.id),
                                        status: wordStatus,
                                    });
                                    setOpen(false);
                                }}
                            >
                                {WORD_STATUS_NAME[wordStatus]}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Popup>
            </Portal>
        </React.Fragment>
    ) : null;
};
