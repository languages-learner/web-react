import React from "react";

import {
    Table as BaseTable,
    type TableProps as BaseTableProps,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/table";
import { type Table as TanstackTable, flexRender } from "@tanstack/react-table";

export interface TableProps extends BaseTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: TanstackTable<any>;
}

export const Table: React.FC<TableProps> = ({ table, ...baseTableProps }) => {
    return (
        <BaseTable {...baseTableProps}>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => {
                    return (
                        <React.Fragment key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const col = header.column;

                                const width = col.getSize();
                                const minWidth = col.columnDef.minSize;
                                const maxWidth = col.columnDef.maxSize;

                                return (
                                    <TableColumn
                                        key={header.id}
                                        style={{
                                            width,
                                            minWidth,
                                            maxWidth,
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </TableColumn>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </TableHeader>

            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                            const col = cell.column;

                            const width = col.getSize();
                            const minWidth = col.columnDef.minSize;
                            const maxWidth = col.columnDef.maxSize;

                            return (
                                <TableCell
                                    key={cell.id}
                                    style={{
                                        width,
                                        minWidth,
                                        maxWidth,
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </BaseTable>
    );
};
