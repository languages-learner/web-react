import { Pencil, TrashBin } from "@gravity-ui/icons";
import { selectionColumn } from "@gravity-ui/table";
import { type ColumnDef } from "@gravity-ui/table/tanstack";
import { Button, Flex, Icon, Popover, Text, spacing } from "@gravity-ui/uikit";

import {
    type AddWordTranslationFormType,
    AddWordTranslationsForm,
} from "@/features/words/addWordTranslationsForm";
import { InlineWordTranslationsList } from "@/features/words/inlineWordTranslationsList";
import { intl } from "@/shared/i18n";
import { type ApiDatabase, type WordWithTranslations } from "@/shared/services/api";
import { type ColumnsDef } from "@/shared/ui/Table";

import { WordStatusSelector } from "../ui/WordStatusSelector";

type BaseColumnCallbackPayload = {
    item: WordWithTranslations;
};

export const wordColumns = {
    selection: selectionColumn as ColumnDef<WordWithTranslations>,
    textAndTranslationWithEdit: (columnProps: {
        editView: (item: WordWithTranslations) => boolean;
        onAddWord: (
            payload: BaseColumnCallbackPayload & {
                translation: AddWordTranslationFormType;
            },
        ) => Promise<unknown>;
        baseTranslationLanguage: string;
        onDeleteTranslation: (
            payload: BaseColumnCallbackPayload & { translationId: string },
        ) => Promise<unknown>;
    }) => ({
        id: "text-with-translations",
        cell: (props) => {
            return (
                <Flex direction={"column"} gap={3}>
                    <Text color={"positive"}>{props.row.original.text}</Text>

                    {columnProps.editView(props.row.original) ? (
                        <Flex gap={2} wrap={"wrap"}>
                            <InlineWordTranslationsList
                                translations={props.row.original.translations}
                                onDeleteTranslation={(translation) =>
                                    columnProps.onDeleteTranslation({
                                        item: props.row.original,
                                        translationId: translation.id,
                                    })
                                }
                            />
                            <AddWordTranslationsForm
                                onSubmit={async (translation) => {
                                    await columnProps.onAddWord({
                                        item: props.row.original,
                                        translation,
                                    });
                                }}
                                baseTranslationLanguage={columnProps.baseTranslationLanguage}
                            />
                        </Flex>
                    ) : (
                        <Text>
                            {props.row.original.translations
                                .map((translation) => translation.text)
                                .join(", ")}
                        </Text>
                    )}
                </Flex>
            );
        },
        size: 600,
        maxSize: 600,
    }),
    edit: (columnProps: {
        editView: (item: WordWithTranslations) => boolean;
        onEditClick: (payload: BaseColumnCallbackPayload) => unknown;
    }) => ({
        id: "edit",
        cell: (props) => (
            <Button
                view={columnProps.editView(props.row.original) ? "flat-success" : "flat"}
                onClick={() => columnProps.onEditClick({ item: props.row.original })}
                style={{ opacity: 0.5 }}
            >
                <Button.Icon>
                    <Icon data={Pencil} />
                </Button.Icon>
            </Button>
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
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
        size: 40,
        minSize: 40,
        maxSize: 40,
    }),
    delete: (columnProps: {
        onDelete: (payload: BaseColumnCallbackPayload) => Promise<unknown>;
    }) => ({
        id: "delete",
        cell: (props) => (
            <Popover
                trigger={"click"}
                content={
                    <Flex className={spacing({ p: 2 })} gap={3} alignItems="center">
                        <Text>Delete word?</Text>
                        <div>
                            <Button
                                view={"outlined-danger"}
                                color={"danger"}
                                onClick={() => columnProps.onDelete({ item: props.row.original })}
                            >
                                {intl.formatMessage({
                                    defaultMessage: "Delete",
                                    id: "K3r6DQ",
                                })}
                            </Button>
                        </div>
                    </Flex>
                }
            >
                <Button view={"flat"} style={{ opacity: 0.5 }}>
                    <Button.Icon>
                        <Icon data={TrashBin} />
                    </Button.Icon>
                </Button>
            </Popover>
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
    }),
} satisfies ColumnsDef<WordWithTranslations>;
