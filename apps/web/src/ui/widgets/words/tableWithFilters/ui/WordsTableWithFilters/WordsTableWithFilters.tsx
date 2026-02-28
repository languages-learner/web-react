import React from "react";

import { useQueryData } from "@gravity-ui/data-source";
import { DataInfiniteLoader } from "@languages-learner/data-source";
import { useDebounceState } from "@languages-learner/react-utils";
import {
    PlaceholderContainer,
    PlaceholderContainerStatus,
    Table,
    useTableRowsSelection,
} from "@languages-learner/uikit";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { WordsTableActionsPanel } from "./WordsTableActionsPanel";

import type { WordsTableFiltersType } from "@/features/words/table";
import type { FetchWordsRequest } from "@languages-learner/api";
import type { ActionsPanelProps } from "@languages-learner/uikit";
import type { RowSelectionState } from "@tanstack/react-table";

import { useUserSafe } from "@/entities/user";
import { wordsDataSource } from "@/entities/word";
import { CreateWordCard } from "@/features/words/createWordCard";
import { WordsTableFilters, initialFilters, useWordsTableColumns } from "@/features/words/table";
import { intl } from "@/shared/i18n";

export interface WordsTableWithFiltersProps {
    renderWordsTableActionsPanel: (
        render: (props: Pick<ActionsPanelProps, "className" | "style">) => React.ReactNode,
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
    const table = useReactTable({
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            onPress: () => {
                                setShowAddWordCard(true);
                            },
                        },
                    ]}
                />
            );
        }

        return (
            <React.Fragment>
                <Table table={table} removeWrapper hideHeader isStriped />
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
                                onPress: () => {
                                    setFilters(initialFilters);
                                },
                            },
                        ]}
                    />
                ) : null}
            </React.Fragment>
        );
    };

    return (
        <div className="flex flex-col justify-center gap-5">
            {hasWordsOrUseFilter ? (
                <WordsTableFilters
                    className="pl-3"
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
                    className="border-medium border-default-200"
                />
            ) : null}

            <DataInfiniteLoader
                status={wordsQuery.status}
                error={wordsQuery.error}
                errorAction={wordsQuery.refetch}
                hasNextPage={wordsQuery.hasNextPage}
                fetchNextPage={wordsQuery.fetchNextPage}
                isFetchingNextPage={wordsQuery.isFetchingNextPage}
            >
                {tableContent()}
            </DataInfiniteLoader>
        </div>
    );
};
