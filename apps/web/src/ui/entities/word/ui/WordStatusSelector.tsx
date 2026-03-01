import React from "react";

import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { ApiConstants } from "@languages-learner/api";
import { BiEdit } from "react-icons/bi";

import { WORD_STATUS_NAME } from "../constants";

import { WordStatusIcon } from "./WordStatusIcon";
import type { ApiDatabase } from "@languages-learner/api";
import type { WordStatusIconProps } from "./WordStatusIcon";

import { intl } from "@/shared/i18n";

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
                        status={
                            status ? (status as unknown as WordStatusIconProps["status"]) : "New"
                        }
                        size={20}
                    />
                </Button>
            );
        }

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
