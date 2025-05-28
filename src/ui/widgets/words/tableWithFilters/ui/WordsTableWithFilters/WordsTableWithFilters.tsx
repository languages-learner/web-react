import React from "react";

import { useQueryData } from "@gravity-ui/data-source";
import { Table, useTable } from "@gravity-ui/table";
import { type RowSelectionState, getCoreRowModel } from "@gravity-ui/table/tanstack";
import { Flex } from "@gravity-ui/uikit";

import { useUserSafe } from "@/entities/user";
import { wordsDataSource } from "@/entities/word";
import { CreateWordCard } from "@/features/words/createWordCard";
import {
    WordsTableFilters,
    type WordsTableFiltersType,
    initialFilters,
    useWordsTableColumns,
} from "@/features/words/table";
import { DataInfiniteLoader } from "@/shared/data-source";
import { useDebounceState } from "@/shared/react-utils";
import { type FetchWordsRequest } from "@/shared/services/api";
import {
    PlaceholderContainer,
    PlaceholderContainerStatus,
    useTableAllRowsSelection,
} from "@/shared/ui";
import { WordsTableActionsPanel } from "@/widgets/words/tableWithFilters/ui/WordsTableWithFilters/WordsTableActionsPanel";

export const WordsTableWithFilters = () => {
    const { user } = useUserSafe();
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [filters, setFilters, debouncedFilters] = useDebounceState<WordsTableFiltersType>(
        initialFilters,
        300,
    );
    const [showAddWordCard, setShowAddWordCard] = React.useState(false);

    const requestFilter = React.useMemo<FetchWordsRequest["filter"]>(() => {
        if (debouncedFilters.text || debouncedFilters.status) {
            return {
                text: debouncedFilters.text,
                status: debouncedFilters.status,
            };
        }

        return undefined;
    }, [debouncedFilters]);

    const wordsQuery = useQueryData(wordsDataSource, {
        pageSize: 100,
        language: user.activeLearningLanguage,
        filter: requestFilter,
    });

    const hasWordsOrUseFilter = wordsQuery.data.length > 0 || requestFilter;
    const showPlaceholders = !showAddWordCard;

    const { wordsTableColumns } = useWordsTableColumns();
    const table = useTable({
        columns: wordsTableColumns,
        data: wordsQuery.data,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
        enableMultiRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    useTableAllRowsSelection({
        isAllRowsSelected: filters.allSelected,
        tableData: wordsQuery.data,
        table,
    });

    const tableContent = () => {
        if (!hasWordsOrUseFilter) {
            if (!showPlaceholders) {
                return null;
            }

            return (
                <PlaceholderContainer
                    status={PlaceholderContainerStatus.Empty}
                    title={"No words"}
                    description={"You can add new words"}
                    actions={[
                        {
                            text: "Add your first word",
                            onClick: () => {
                                setShowAddWordCard(true);
                            },
                        },
                    ]}
                    size={"m"}
                />
            );
        }

        return (
            <React.Fragment>
                <Table table={table} withHeader={false} />
                {showPlaceholders && wordsQuery.data.length === 0 ? (
                    <PlaceholderContainer
                        status={PlaceholderContainerStatus.NoSearchResults}
                        title={"No found words"}
                        description={"Try to change filter values or add new words"}
                        actions={[
                            {
                                text: "Clear filters",
                                onClick: () => {
                                    setFilters(initialFilters);
                                },
                            },
                        ]}
                        size={"m"}
                    />
                ) : null}
            </React.Fragment>
        );
    };

    return (
        <Flex justifyContent={"center"} direction={"column"} gap={5}>
            {hasWordsOrUseFilter ? (
                <WordsTableFilters
                    filters={filters}
                    onUpdate={(value) => setFilters(value)}
                    onAddWordClick={() => setShowAddWordCard(true)}
                    showAddWordButton={!showAddWordCard}
                    onAllSelectedClick={() => table.toggleAllRowsSelected()}
                />
            ) : null}
            {showAddWordCard ? (
                <CreateWordCard
                    onClose={() => setShowAddWordCard(false)}
                    onSubmit={() => setShowAddWordCard(false)}
                    sourceWord={filters.text}
                />
            ) : null}

            <DataInfiniteLoader
                status={wordsQuery.status}
                error={wordsQuery.error}
                errorAction={wordsQuery.refetch}
                hasNextPage={wordsQuery.hasNextPage}
                fetchNextPage={wordsQuery.fetchNextPage}
                isFetchingNextPage={wordsQuery.isFetchingNextPage}
                errorViewProps={{ size: "m" }}
            >
                {tableContent()}
            </DataInfiniteLoader>

            <WordsTableActionsPanel
                selectedWords={table.getSelectedRowModel().rows.map((row) => row.original)}
            />
        </Flex>
    );
};
