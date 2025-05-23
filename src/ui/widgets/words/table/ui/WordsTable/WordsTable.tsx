import React from "react";

import { Table, useTable } from "@gravity-ui/table";
import {
    type ColumnDef,
    type RowSelectionState,
    getCoreRowModel,
} from "@gravity-ui/table/tanstack";

import { useWordActions, wordColumns } from "@/entities/word";
import { withToasts } from "@/shared/ui";

import type { ApiDatabase, ApiTables } from "@/shared/services/api";

export interface WordsTableProps {
    words: ApiDatabase["public"]["Tables"]["words"]["Row"][];
}

export const WordsTable: React.FC<WordsTableProps> = ({ words }) => {
    const [editingWords, setEditingWords] = React.useState(new Set<string>());

    const { updateWordStatus } = useWordActions();

    const columns = React.useMemo<ColumnDef<ApiTables<"words">>[]>(() => {
        return [
            wordColumns.selection,
            wordColumns.textAndTranslationWithEdit({
                editView: (item) => editingWords.has(item.id),
            }),
            wordColumns.status({
                onUpdate: ({ item, status }) =>
                    withToasts(
                        updateWordStatus({
                            word: item,
                            status,
                        }),
                        {
                            id: "words-table-update-word-status",
                            successText: "Статус успешно обновлен!",
                            errorText:
                                "Произошла ошибка при обновлении статуса.",
                        },
                    ),
            }),
            wordColumns.edit({
                onEditClick: ({ item }) => {
                    if (editingWords.has(item.id)) {
                        setEditingWords((prev) => {
                            const result = new Set(prev);
                            result.delete(item.id);

                            return result;
                        });
                    } else {
                        setEditingWords((prev) => new Set(prev).add(item.id));
                    }
                },
            }),
            wordColumns.delete({ onDelete: () => {} }),
        ];
    }, [editingWords, updateWordStatus]);

    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
        {},
    );

    const table = useTable({
        columns,
        data: words,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
        enableMultiRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    return <Table table={table} />;
};
