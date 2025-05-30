import React from "react";

import { useQueryData } from "@gravity-ui/data-source";
import { Table, useTable } from "@gravity-ui/table";
import {
    type RowSelectionState,
    type Table as TableA,
    getCoreRowModel,
} from "@gravity-ui/table/tanstack";
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
import { intl } from "@/shared/i18n";
import { useDebounceState } from "@/shared/react-utils";
import { type FetchWordsRequest } from "@/shared/services/api";
import {
    PlaceholderContainer,
    PlaceholderContainerStatus,
    // useTableAllRowsSelection,
} from "@/shared/ui";

import { WordsTableActionsPanel } from "./WordsTableActionsPanel";

export interface UseTableSelectionProps {
    // eslint-disable-next-line
    table: TableA<any>;
}
export const useTableRowsSelection = ({ table }: UseTableSelectionProps) => {
    // Force to select all rows
    const [forceSelectAllRows, setForceSelectAllRows] = React.useState(false);
    const isAllRowsSelected = table.getIsAllRowsSelected();
    // Hack to fix bug of table:
    // When use "table.toggleAllRowsSelected(true)" and after
    // try to get selections state by "table.getIsAllRowsSelected()" you get false
    let wasAllRowsSelectedInCurrentRender = false;

    const selectedItems = React.useMemo(
        () => table.getSelectedRowModel().rows.map((row) => row.original),
        [table.getState().rowSelection],
    );

    const toggleForceSelectAllRows = (value: boolean) => {
        if (!value) {
            table.toggleAllRowsSelected(false);
            setForceSelectAllRows(false);

            return;
        }

        setForceSelectAllRows(true);
    };

    // Select new rows
    React.useEffect(() => {
        if (forceSelectAllRows) {
            table.toggleAllRowsSelected(true);
            wasAllRowsSelectedInCurrentRender = true;
        }
    }, [table.getRowModel().rows, forceSelectAllRows]);

    // Disable forceSelectAllRows if some row was unselected
    React.useEffect(() => {
        if (!isAllRowsSelected && forceSelectAllRows && !wasAllRowsSelectedInCurrentRender) {
            setForceSelectAllRows(false);
        }
    }, [isAllRowsSelected]);

    return {
        isAllRowsSelected,
        selectedItems,
        toggleAllRowsSelected: table.toggleAllRowsSelected,
        forceSelectAllRows,
        toggleForceSelectAllRows,
    };
};

export interface WordsTableWithFiltersProps {
    renderWordsTableActionsPanel: (
        render: ({ className }: { className: string }) => React.ReactNode,
    ) => unknown;
}

export const WordsTableWithFilters: React.FC<WordsTableWithFiltersProps> = ({
    renderWordsTableActionsPanel,
}) => {
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

    const {
        selectedItems: selectedWords,
        toggleAllRowsSelected,
        forceSelectAllRows,
        toggleForceSelectAllRows,
    } = useTableRowsSelection({
        table,
    });

    React.useEffect(() => {
        renderWordsTableActionsPanel((props) =>
            selectedWords.length > 0 ? (
                <WordsTableActionsPanel
                    selectedWords={selectedWords}
                    onClose={() => {
                        toggleAllRowsSelected(false);
                    }}
                    {...props}
                />
            ) : null,
        );
    }, [selectedWords]);

    const tableContent = () => {
        if (!hasWordsOrUseFilter) {
            if (!showPlaceholders) {
                return null;
            }

            return (
                <PlaceholderContainer
                    status={PlaceholderContainerStatus.Empty}
                    title={intl.formatMessage({
                        defaultMessage: "No words",
                        id: "cD/L1D",
                    })}
                    description={intl.formatMessage({
                        defaultMessage: "You can add new words",
                        id: "TEMpMH",
                    })}
                    actions={[
                        {
                            text: intl.formatMessage({
                                defaultMessage: "Add your first word",
                                id: "mNsvXG",
                            }),
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
                        title={intl.formatMessage({
                            defaultMessage: "No found words",
                            id: "to6vVZ",
                        })}
                        description={intl.formatMessage({
                            defaultMessage: "Try to change filter values or add new words",
                            id: "qqcgIL",
                        })}
                        actions={[
                            {
                                text: intl.formatMessage({
                                    defaultMessage: "Clear filters",
                                    id: "F4gyn3",
                                }),
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
                    onUpdate={(value) => {
                        toggleAllRowsSelected(false);
                        setFilters(value);
                    }}
                    onAddWordClick={() => setShowAddWordCard(true)}
                    showAddWordButton={!showAddWordCard}
                    isAllSelected={forceSelectAllRows}
                    onUpdateAllSelection={toggleForceSelectAllRows}
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
        </Flex>
    );
};
