import React from "react";

import { useQueryData } from "@gravity-ui/data-source";
import { Flex, spacing } from "@gravity-ui/uikit";
import classNames from "classnames";

import { useUserSafe } from "@/entities/user";
import { CreateWordCard, wordsDataSource } from "@/entities/word";
import { WorkspaceLayout } from "@/pages/workspace/layout";
import { DataInfiniteLoader } from "@/shared/data-source";
import { PlaceholderContainer, PlaceholderContainerStatus } from "@/shared/ui";
import {
    WordsTable,
    WordsTableFilters,
    type WordsTableFiltersType,
} from "@/widgets/words/table";

export const WorkspaceDictionaryPage = () => {
    const { user } = useUserSafe();
    const [filters, setFilters] = React.useState<WordsTableFiltersType>({});
    const [showAddWordCard, setShowAddWordCard] = React.useState(true);
    const wordsQuery = useQueryData(wordsDataSource, {
        pageSize: 1,
        language: user.activeLearningLanguage,
    });

    return (
        <WorkspaceLayout>
            <DataInfiniteLoader
                status={wordsQuery.status}
                error={wordsQuery.error}
                errorAction={wordsQuery.refetch}
                hasNextPage={wordsQuery.hasNextPage}
                fetchNextPage={wordsQuery.fetchNextPage}
                isFetchingNextPage={wordsQuery.isFetchingNextPage}
                errorViewProps={{ size: "m" }}
            >
                {wordsQuery.data.length > 0 ? (
                    <Flex justifyContent={"center"}>
                        <Flex
                            justifyContent={"center"}
                            direction={"column"}
                            style={{ maxWidth: 960 }}
                            gap={5}
                        >
                            <WordsTableFilters
                                filters={filters}
                                onUpdate={setFilters}
                                onAddWordClick={() => setShowAddWordCard(true)}
                                showAddWordButton={!showAddWordCard}
                            />
                            {showAddWordCard ? (
                                <CreateWordCard
                                    onClose={() => setShowAddWordCard(false)}
                                />
                            ) : null}
                            <WordsTable words={wordsQuery.data} />
                        </Flex>
                    </Flex>
                ) : (
                    <PlaceholderContainer
                        status={PlaceholderContainerStatus.Empty}
                        title={"No words"}
                        description={"You can add new words"}
                        actions={[
                            {
                                text: "Add word",
                                onClick: () => {
                                    // eslint-disable-next-line no-console
                                    console.log("Add new word");
                                },
                            },
                        ]}
                        size={"m"}
                    />
                )}
            </DataInfiniteLoader>
        </WorkspaceLayout>
    );
};
