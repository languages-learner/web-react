import type { ColumnDef, RowData } from "@tanstack/react-table";

export type ColumnDefFactory<TData extends RowData = unknown, TValue = unknown> = (
    props: never,
) => ColumnDef<TData, TValue>;

export type ColumnsDef<TData extends RowData, TValue = unknown> = Record<
    string,
    ColumnDef<TData, TValue> | ColumnDefFactory<TData, TValue>
>;
