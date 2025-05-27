import { WorkspaceLayout } from "@/pages/workspace/layout";
import { block } from "@/shared/classNames";
import { WordsTableWithFilters } from "@/widgets/words/tableWithFilters";

import "./WorkspaceDictionaryPage.scss";

const b = block("WorkspaceDictionaryPage");

export const WorkspaceDictionaryPage = () => {
    return (
        <WorkspaceLayout>
            <div className={b()}>
                <WordsTableWithFilters />
            </div>
        </WorkspaceLayout>
    );
};
