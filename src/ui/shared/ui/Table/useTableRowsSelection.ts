import React from "react";

import { type Table } from "@tanstack/react-table";

export interface UseTableSelectionProps {
    // eslint-disable-next-line
    table: Table<any>;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
            wasAllRowsSelectedInCurrentRender = true;
        }
    }, [table.getRowModel().rows, forceSelectAllRows]);

    // Disable forceSelectAllRows if some row was unselected
    React.useEffect(() => {
        if (!isAllRowsSelected && forceSelectAllRows && !wasAllRowsSelectedInCurrentRender) {
            setForceSelectAllRows(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAllRowsSelected]);

    return {
        isAllRowsSelected,
        selectedItems,
        toggleAllRowsSelected: table.toggleAllRowsSelected,
        forceSelectAllRows,
        toggleForceSelectAllRows,
    };
};
