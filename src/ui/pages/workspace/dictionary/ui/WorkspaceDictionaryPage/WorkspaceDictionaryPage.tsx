import { useQueryData } from "@gravity-ui/data-source";

import { useUserSafe } from "@/entities/user";
import { wordsDataSource } from "@/entities/word";
import { WorkspaceLayout } from "@/pages/workspace/layout";
import { DataInfiniteLoader } from "@/shared/data-source";
import { PlaceholderContainer, PlaceholderContainerStatus } from "@/shared/ui";
import { WordsTable } from "@/widgets/words/table";

export const WorkspaceDictionaryPage = () => {
    const { user } = useUserSafe();
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
                    <WordsTable words={wordsQuery.data} />
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
