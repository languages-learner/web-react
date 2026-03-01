import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { selectionColumn } from "@languages-learner/uikit";
import { BiPencil, BiTrash } from "react-icons/bi";
import { WordStatusSelector } from "../ui/WordStatusSelector";
import type { ApiDatabase, WordWithTranslations } from "@languages-learner/api";
import type { ColumnsDef } from "@languages-learner/uikit";
import type { ColumnDef } from "@tanstack/react-table";

import type { AddWordTranslationFormType } from "@/features/words/addWordTranslationsForm";
import { AddWordTranslationsForm } from "@/features/words/addWordTranslationsForm";
import { InlineWordTranslationsList } from "@/features/words/inlineWordTranslationsList";
import { intl } from "@/shared/i18n";

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
                <div className="flex flex-col gap-3">
                    <span className="text-success">{props.row.original.text}</span>

                    {columnProps.editView(props.row.original) ? (
                        <div className="flex flex-wrap gap-2">
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
                        </div>
                    ) : (
                        <span>
                            {props.row.original.translations
                                .map((translation) => translation.text)
                                .join(", ")}
                        </span>
                    )}
                </div>
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
                isIconOnly
                size="sm"
                variant={"light"}
                onPress={() => columnProps.onEditClick({ item: props.row.original })}
                style={{ opacity: 0.5 }}
                color={columnProps.editView(props.row.original) ? "success" : "default"}
            >
                <BiPencil size={16} />
            </Button>
        ),
        size: 50,
        minSize: 50,
        maxSize: 50,
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
                variant="icon"
            />
        ),
        size: 50,
        minSize: 50,
        maxSize: 50,
    }),
    delete: (columnProps: {
        onDelete: (payload: BaseColumnCallbackPayload) => Promise<unknown>;
    }) => ({
        id: "delete",
        cell: (props) => (
            <Popover placement="bottom">
                <PopoverTrigger>
                    <Button isIconOnly size="sm" variant={"light"} style={{ opacity: 0.5 }}>
                        <BiTrash size={16} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-3">
                    <div className="flex items-center gap-2">
                        <div className="text-small">
                            {intl.formatMessage({
                                defaultMessage: "Delete word?",
                                id: "C3rwYs",
                            })}
                        </div>
                        <Button
                            onPress={() => columnProps.onDelete({ item: props.row.original })}
                            size="sm"
                            color="danger"
                            variant="bordered"
                        >
                            {intl.formatMessage({
                                defaultMessage: "Delete",
                                id: "K3r6DQ",
                            })}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        ),
        size: 50,
        minSize: 50,
        maxSize: 50,
    }),
} satisfies ColumnsDef<WordWithTranslations>;
