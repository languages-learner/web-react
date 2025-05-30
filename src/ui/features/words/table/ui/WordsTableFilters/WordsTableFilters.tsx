import React from "react";

import { Button, Checkbox, Flex, SegmentedRadioGroup, TextInput } from "@gravity-ui/uikit";

import { WORD_STATUS_NAME } from "@/entities/word";
import { intl } from "@/shared/i18n";

import { type WordsTableFiltersType } from "./lib";

import styles from "./WordsTableFilters.module.scss";

export interface WordsTableFiltersProps {
    filters: WordsTableFiltersType;
    onUpdate: (filters: WordsTableFiltersType) => unknown;
    onAddWordClick: () => unknown;
    showAddWordButton?: boolean;
    onAllSelectedClick: () => unknown;
}

export const WordsTableFilters: React.FC<WordsTableFiltersProps> = ({
    filters,
    onUpdate,
    onAddWordClick,
    showAddWordButton,
    onAllSelectedClick,
}) => {
    return (
        <Flex gap={3} justifyContent={"space-between"}>
            <Flex gap={3} alignItems={"center"} className={styles.WordsTableFilters}>
                <Checkbox
                    checked={filters.allSelected}
                    onUpdate={(value) => {
                        onAllSelectedClick();
                        onUpdate({
                            ...filters,
                            allSelected: value,
                        });
                    }}
                />
                <TextInput
                    placeholder={intl.formatMessage({
                        defaultMessage: "Search",
                        id: "xmcVZ0",
                    })}
                    size="l"
                    value={filters.text}
                    onUpdate={(value) =>
                        onUpdate({
                            ...filters,
                            text: value,
                        })
                    }
                    hasClear
                />
                {showAddWordButton ? (
                    <Button view="outlined-action" size="l" onClick={onAddWordClick}>
                        {intl.formatMessage({
                            defaultMessage: "Add word",
                            id: "iTJyw/",
                        })}
                    </Button>
                ) : null}
            </Flex>
            <Flex gap={3} alignItems={"center"} className={styles.WordsTableFilters}>
                <SegmentedRadioGroup<NonNullable<WordsTableFiltersType["status"]> | "All">
                    size="l"
                    value={filters.status ?? "All"}
                    onUpdate={(value) =>
                        onUpdate({
                            ...filters,
                            status: value === "All" ? undefined : value,
                        })
                    }
                    options={[
                        {
                            value: "All",
                            content: intl.formatMessage({
                                defaultMessage: "All",
                                id: "zQvVDJ",
                            }),
                        },
                        { value: "New", content: WORD_STATUS_NAME["New"] },
                        { value: "Learn", content: WORD_STATUS_NAME["Learn"] },
                        { value: "Learned", content: WORD_STATUS_NAME["Learned"] },
                    ]}
                />
            </Flex>
        </Flex>
    );
};
