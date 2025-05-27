import React from "react";

import { useQueryData } from "@gravity-ui/data-source";
import { Flex } from "@gravity-ui/uikit";

import { useUserSafe } from "@/entities/user";
import { wordsDataSource } from "@/entities/word";
import { CreateWordCard } from "@/features/words/createWordCard";
import {
    WordsTable,
    WordsTableFilters,
    type WordsTableFiltersType,
    initialFilters,
} from "@/features/words/table";
import { DataInfiniteLoader } from "@/shared/data-source";
import { useDebounceState } from "@/shared/react-utils";
import { type FetchWordsRequest } from "@/shared/services/api";
import { PlaceholderContainer, PlaceholderContainerStatus } from "@/shared/ui";

export const WordsTableWithFilters = () => {
    const { user } = useUserSafe();
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
                <WordsTable words={wordsQuery.data} />
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
