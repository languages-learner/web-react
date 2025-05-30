import React from "react";

import { WorkspaceLayout } from "@/pages/workspace/layout";
import { block, classNames } from "@/shared/class-names";
import {
    WordsTableWithFilters,
    type WordsTableWithFiltersProps,
} from "@/widgets/words/tableWithFilters";

import "./WorkspaceDictionaryPage.scss";

const b = block("WorkspaceDictionaryPage");

const WorkspaceDictionaryPageContent = () => {
    const [actionsPanel, setActionsPanel] = React.useState<React.ReactNode | undefined>();

    const renderWordsTableActionsPanel: WordsTableWithFiltersProps["renderWordsTableActionsPanel"] =
        (render) => {
            setActionsPanel(render({ className: b("actionsPanel") }));
        };

    return (
        <div className={classNames(b({ withActionsPanel: Boolean(actionsPanel) }))}>
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
