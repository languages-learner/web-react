import { Pencil, TrashBin } from "@gravity-ui/icons";
import { selectionColumn } from "@gravity-ui/table";
import { type ColumnDef } from "@gravity-ui/table/tanstack";
import { Button, Flex, Icon, Text } from "@gravity-ui/uikit";

import { WordStatusSelector } from "@/entities/word";
import { type ApiDatabase, type ApiTables } from "@/shared/services/api";
import { type ColumnsDef } from "@/shared/ui/Table";

type Word = ApiTables<"words">;

type BaseColumnCallbackPayload = {
    item: Word;
};

export const wordColumns = {
    selection: selectionColumn as ColumnDef<Word>,
    textAndTranslationWithEdit: (columnProps: {
        editView: (item: Word) => boolean;
    }) => ({
        id: "text-with-translations",
        cell: (props) => (
            <Flex direction={"column"} gap={3}>
                <Text color={"positive"}>{props.row.original.text}</Text>
                <Text>{props.row.original.translations.join(", ")}</Text>
                {columnProps.editView(props.row.original) ? "+" : "-"}
            </Flex>
        ),
        size: 600,
    }),
    edit: (columnProps: {
        onEditClick: (payload: BaseColumnCallbackPayload) => unknown;
    }) => ({
        id: "edit",
        cell: (props) => (
            <Button
                view={"flat"}
                onClick={() =>
                    columnProps.onEditClick({ item: props.row.original })
                }
            >
                <Button.Icon>
                    <Icon data={Pencil} />
                </Button.Icon>
            </Button>
        ),
        size: 50,
    }),
    status: (columnProps: {
        onUpdate: (
            payload: BaseColumnCallbackPayload & {
                status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
            },
        ) => unknown;
    }) => ({
        id: "status",
        cell: (props) => (
            <WordStatusSelector
                onUpdate={(status) =>
                    columnProps.onUpdate({
                        item: props.row.original,
                        status,
                    })
                }
                status={props.row.original.status}
            />
        ),
        size: 150,
    }),
    delete: (columnProps: {
        onDelete: (payload: BaseColumnCallbackPayload) => unknown;
    }) => ({
        id: "delete",
        cell: (props) => (
            <Button
                view={"flat"}
                onClick={() =>
                    columnProps.onDelete({ item: props.row.original })
                }
            >
                <Button.Icon>
                    <Icon data={TrashBin} />
                </Button.Icon>
            </Button>
        ),
        size: 50,
    }),
} satisfies ColumnsDef<Word>;
