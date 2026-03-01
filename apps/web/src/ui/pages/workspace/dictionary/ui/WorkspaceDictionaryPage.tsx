import React from "react";

import type { WordsTableWithFiltersProps } from "@/widgets/words/tableWithFilters";
import { WorkspaceLayout } from "@/pages/workspace/layout";
import { WordsTableWithFilters } from "@/widgets/words/tableWithFilters";

const WorkspaceDictionaryPageContent = () => {
    const el = React.useRef<HTMLDivElement>(null);
    const [actionsPanel, setActionsPanel] = React.useState<React.ReactNode | undefined>();

    const renderWordsTableActionsPanel: WordsTableWithFiltersProps["renderWordsTableActionsPanel"] =
        (render) => {
            setActionsPanel(
                render({
                    className: `z-1 bottom-5 fixed`,
                    style: {
                        width: `${el.current?.clientWidth}px`,
                    },
                }),
            );
        };

    return (
        <div ref={el} className={actionsPanel ? "pb-(--app-actions-panel-height)" : ""}>
            <WordsTableWithFilters renderWordsTableActionsPanel={renderWordsTableActionsPanel} />
            {actionsPanel}
        </div>
    );
};

export const WorkspaceDictionaryPage = () => {
    return (
        <WorkspaceLayout>
            <WorkspaceDictionaryPageContent />
        </WorkspaceLayout>
    );
};
