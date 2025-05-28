import React from "react";

import { type Table } from "@gravity-ui/table/tanstack";

export interface UseTableSelectionProps {
    isAllRowsSelected?: boolean;
    // eslint-disable-next-line
    tableData: any[];
    // eslint-disable-next-line
    table: Table<any>;
}
export const useTableAllRowsSelection = ({
    isAllRowsSelected,
    table,
    tableData,
}: UseTableSelectionProps) => {
    React.useEffect(() => {
        if (isAllRowsSelected) {
            table.toggleAllRowsSelected(true);
        }
    }, [tableData]);

    // console.log(table.getIsAllRowsSelected);

    // React.useEffect(() => {
    //     if (!isAllRowsSelected) {
    //         table.toggleAllRowsSelected(false);
    //     }
    // }, [isAllRowsSelected]);
};
