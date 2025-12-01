import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "../../Checkbox";

export const selectionColumn: ColumnDef<unknown> = {
    id: "_select",
    header: ({ table }) => (
        <Checkbox
            isSelected={table.getIsAllRowsSelected()}
            disabled={!table.options.enableRowSelection}
            isIndeterminate={table.getIsSomeRowsSelected()}
            onValueChange={table.getToggleAllRowsSelectedHandler()}
        />
    ),
    cell: (cellContext) => (
        <Checkbox
            size="sm"
            isSelected={cellContext.row.getIsSelected()}
            disabled={!cellContext.row.getCanSelect()}
            isIndeterminate={cellContext.row.getIsSomeSelected()}
            onValueChange={cellContext.row.getToggleSelectedHandler()}
        />
    ),
    meta: {
        hideInSettings: true,
    },
    size: 32,
    minSize: 32,
};
