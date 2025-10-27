import React from "react";

import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { BiEdit } from "react-icons/bi";

import { intl } from "@/shared/i18n";
import { ApiConstants, type ApiDatabase } from "shared/services/api";

import { WORD_STATUS_NAME } from "../constants";

import { WordStatusIcon, type WordStatusIconProps } from "./WordStatusIcon";

export interface WordStatusSelectorProps {
    status?: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
    onUpdate: (status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"]) => unknown;
    variant: "icon" | "button";
    classNames?: {
        trigger?: string;
    };
}

export const WordStatusSelector: React.FC<WordStatusSelectorProps> = ({
    status,
    onUpdate,
    variant,
    classNames,
}) => {
    const renderTrigget = () => {
        if (variant === "icon") {
            return (
                <Button isIconOnly variant="light" size="sm" className={classNames?.trigger}>
                    <WordStatusIcon
                        status={(status as unknown as WordStatusIconProps["status"]) ?? "New"}
                        size={20}
                    />
                </Button>
            );
        }

        if (variant === "button") {
            return (
                <Button
                    size="sm"
                    variant="light"
                    startContent={<BiEdit size={16} />}
                    className={classNames?.trigger}
                >
                    {intl.formatMessage({
                        defaultMessage: "Update status",
                        id: "zCAHPc",
                    })}
                </Button>
            );
        }

        return null;
    };

    return (
        <Dropdown>
            <DropdownTrigger>{renderTrigget()}</DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection example"
                selectedKeys={status ? [status] : []}
                selectionMode="single"
                variant="flat"
                onSelectionChange={(values) => {
                    if (values.currentKey) {
                        onUpdate(
                            values.currentKey as ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
                        );
                    }
                }}
            >
                {ApiConstants.public.Enums.UserWordStatus.map((wordStatus) => (
                    <DropdownItem key={wordStatus}>
                        <div className="flex gap-3">
                            <WordStatusIcon status={wordStatus} size={20} />
                            {WORD_STATUS_NAME[wordStatus]}
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
