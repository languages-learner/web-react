import React from "react";

import { Button, Popover, Select } from "@gravity-ui/uikit";

import { WORD_STATUS_NAME } from "@/entities/word";
import { ApiConstants, type ApiDatabase } from "@/shared/services/api";

import { WordStatusIcon, type WordStatusIconProps } from "../WordStatusIcon";

export interface WordStatusSelectorProps {
    status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
    onUpdate: (status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"]) => unknown;
}

export const WordStatusSelector: React.FC<WordStatusSelectorProps> = ({ status, onUpdate }) => {
    return (
        <Select<ApiDatabase["public"]["Tables"]["words"]["Row"]["status"]>
            title="Word status"
            onUpdate={(values) =>
                onUpdate(values[0] as ApiDatabase["public"]["Tables"]["words"]["Row"]["status"])
            }
            value={[status]}
            size={"l"}
            renderControl={({ triggerProps }, { value }) => (
                <Popover>
                    <Button view={"flat"} onClick={triggerProps.onClick}>
                        <Button.Icon>
                            <WordStatusIcon
                                status={value as unknown as WordStatusIconProps["status"]}
                                size={20}
                            />
                        </Button.Icon>
                    </Button>
                </Popover>
            )}
        >
            {ApiConstants.public.Enums.UserWordStatus.map((wordStatus) => (
                <Select.Option
                    key={wordStatus}
                    content={WORD_STATUS_NAME[wordStatus]}
                    value={wordStatus}
                />
            ))}
        </Select>
    );
};
