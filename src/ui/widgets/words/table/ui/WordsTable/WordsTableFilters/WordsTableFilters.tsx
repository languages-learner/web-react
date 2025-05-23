import React from "react";

import {
    Button,
    Checkbox,
    Flex,
    SegmentedRadioGroup,
    TextInput,
} from "@gravity-ui/uikit";

import type { ApiTables } from "@/shared/services/api";

import styles from "./WordsTableFilters.module.scss";

export interface WordsTableFiltersType {
    allSelected?: boolean;
    search?: string;
    status?: ApiTables<"words">["status"];
}

export interface WordsTableFiltersProps {
    filters: WordsTableFiltersType;
    onUpdate: (filters: WordsTableFiltersType) => unknown;
    onAddWordClick: () => unknown;
    showAddWordButton?: boolean;
}

export const WordsTableFilters: React.FC<WordsTableFiltersProps> = ({
    filters,
    onUpdate,
    onAddWordClick,
    showAddWordButton,
}) => {
    return (
        <Flex gap={3} justifyContent={"space-between"}>
            <Flex
                gap={3}
                alignItems={"center"}
                className={styles.WordsTableFilters}
            >
                <Checkbox
                    checked={filters.allSelected}
                    onUpdate={(value) =>
                        onUpdate({
                            ...filters,
                            allSelected: value,
                        })
                    }
                />
                <TextInput
                    placeholder="Search"
                    size="l"
                    value={filters.search}
                    onUpdate={(value) =>
                        onUpdate({
                            ...filters,
                            search: value,
                        })
                    }
                />
                {showAddWordButton ? (
                    <Button
                        view="outlined-action"
                        size="l"
                        onClick={onAddWordClick}
                    >
                        Add word
                    </Button>
                ) : null}
            </Flex>
            <Flex
                gap={3}
                alignItems={"center"}
                className={styles.WordsTableFilters}
            >
                <SegmentedRadioGroup<ApiTables<"words">["status"] | "All">
                    size="l"
                    value={filters.status}
                    defaultValue="All"
                    options={[
                        { value: "All", content: "All" },
                        { value: "New", content: "New" },
                        { value: "Learn", content: "Learn" },
                        { value: "Learned", content: "Learned" },
                    ]}
                />
            </Flex>
        </Flex>
    );
};
