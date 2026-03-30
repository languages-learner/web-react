import React from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tab, Tabs } from "@heroui/tabs";
import { classNames } from "@languages-learner/class-names";
import { Checkbox } from "@languages-learner/uikit";

import type { WordsTableFiltersType } from "./lib";

import { WORD_STATUS_NAME } from "@/entities/word";
import { intl } from "@/shared/i18n";

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
        <div
            className={classNames(
                "flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-2",
                className,
            )}
        >
            <div className="flex min-w-0 flex-nowrap items-center gap-2 md:gap-x-3">
                <Checkbox
                    disableAnimation
                    className="shrink-0"
                    size="sm"
                    radius="sm"
                    isSelected={isAllSelected}
                    onValueChange={onUpdateAllSelection}
                />
                <div className="min-w-0 flex-1">
                    <Input
                        classNames={{
                            base: "w-full min-w-0",
                            inputWrapper: "w-full min-w-0",
                        }}
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
                    <div className="shrink-0">
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
            <div className="w-full min-w-0 md:w-auto md:pl-2">
                <Tabs
                    classNames={{
                        base: "w-full max-md:max-w-full",
                        tabList:
                            "h-full w-full justify-between sm:gap-2 md:w-auto md:justify-start",
                    }}
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
