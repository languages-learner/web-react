import { type ColumnDef, type RowData } from "@gravity-ui/table/tanstack";

export type ColumnDefFactory<TData extends RowData = unknown, TValue = unknown> = (
    props: never,
) => ColumnDef<TData, TValue>;

export type ColumnsDef<TData extends RowData, TValue = unknown> = Record<
    string,
    ColumnDef<TData, TValue> | ColumnDefFactory<TData, TValue>
>;
