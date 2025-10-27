import React from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tab, Tabs } from "@heroui/tabs";

import { WORD_STATUS_NAME } from "@/entities/word";
import { classNames } from "@/shared/class-names";
import { intl } from "@/shared/i18n";
import { Checkbox } from "@/shared/ui";

import { type WordsTableFiltersType } from "./lib";

export interface WordsTableFiltersProps {
    filters: WordsTableFiltersType;
    onUpdate: (filters: WordsTableFiltersType) => unknown;
    onAddWordClick: () => unknown;
    showAddWordButton?: boolean;
    isAllSelected: boolean;
    onUpdateAllSelection: (value: boolean) => unknown;
    className?: string;
}

export const WordsTableFilters: React.FC<WordsTableFiltersProps> = ({
    filters,
    onUpdate,
    onAddWordClick,
    showAddWordButton,
    isAllSelected,
    onUpdateAllSelection,
    className,
}) => {
    return (
        <div className={classNames("flex justify-between", className)}>
            <div className="flex items-center gap-x-3">
                <Checkbox
                    disableAnimation
                    size="sm"
                    radius="sm"
                    isSelected={isAllSelected}
                    onValueChange={onUpdateAllSelection}
                />
                <div>
                    <Input
                        placeholder={intl.formatMessage({
                            defaultMessage: "Search",
                            id: "xmcVZ0",
                        })}
                        size="md"
                        variant="bordered"
                        radius="sm"
                        value={filters.text}
                        onValueChange={(value) =>
                            onUpdate({
                                ...filters,
                                text: value,
                            })
                        }
                        isClearable
                    />
                </div>
                {showAddWordButton ? (
                    <div>
                        <Button
                            color="primary"
                            variant="bordered"
                            radius="sm"
                            size="md"
                            onPress={onAddWordClick}
                        >
                            {intl.formatMessage({
                                defaultMessage: "Add word",
                                id: "iTJyw/",
                            })}
                        </Button>
                    </div>
                ) : null}
            </div>
            <div className="flex items-center gap-x-3 pl-2">
                <Tabs
                    variant="bordered"
                    color="primary"
                    defaultSelectedKey={filters.status ?? "All"}
                    onSelectionChange={(value) =>
                        onUpdate({
                            ...filters,
                            status: (value === "All"
                                ? undefined
                                : value) as WordsTableFiltersType["status"],
                        })
                    }
                >
                    <Tab
                        key="All"
                        title={intl.formatMessage({
                            defaultMessage: "All",
                            id: "zQvVDJ",
                        })}
                    />
                    <Tab key="New" title={WORD_STATUS_NAME["New"]} />
                    <Tab key="Learn" title={WORD_STATUS_NAME["Learn"]} />
                    <Tab key="Learned" title={WORD_STATUS_NAME["Learned"]} />
                </Tabs>
            </div>
        </div>
    );
};
