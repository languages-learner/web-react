import React from "react";

import { Button } from "@heroui/button";
import arrayMutators from "final-form-arrays";
import { Field, Form, type FormProps } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

import { LanguageSelector } from "@/features/language/languageSelector";
import { AddWordTranslationsForm } from "@/features/words/addWordTranslationsForm";
import { InlineWordTranslationsList } from "@/features/words/inlineWordTranslationsList";
import { classNames } from "@/shared/class-names";
import { FormRowsContainer, FormTextInput } from "@/shared/form-components";
import { intl } from "@/shared/i18n";

import { type WordFormType, validateWord } from "./lib";

export interface CreateWordFormProps extends FormProps<WordFormType> {
    contentClassName?: string;
    baseTranslation: WordFormType["translations"][number];
}

export const CreateWordForm: React.FC<CreateWordFormProps> = ({
    contentClassName,
    baseTranslation,
    ...formProps
}) => {
    return (
        <Form<WordFormType>
            {...formProps}
            validate={validateWord}
            mutators={{
                ...arrayMutators,
            }}
        >
            {({ submitting, handleSubmit, valid }) => (
                <div className="flex flex-col gap-5">
                    <div
                        className={classNames(
                            "flex max-w-[500px] flex-col gap-3",
                            contentClassName,
                        )}
                    >
                        <FormRowsContainer>
                            <FormRowsContainer.Row
                                title={intl.formatMessage({
                                    defaultMessage: "Source word",
                                    id: "R1QL2E",
                                })}
                            >
                                <div className="flex gap-3">
                                    <Field<string> name={"source.text"}>
                                        {(props) => (
                                            <FormTextInput
                                                size="sm"
                                                variant="bordered"
                                                placeholder={intl.formatMessage({
                                                    defaultMessage: "Text",
                                                    id: "aA8bDw",
                                                })}
                                                fieldProps={props}
                                                autoFocus
                                            />
                                        )}
                                    </Field>
                                    <Field name={"source.language"}>
                                        {(props) => (
                                            <div>
                                                <LanguageSelector
                                                    classNames={{
                                                        innerWrapper: "w-full pr-6",
                                                    }}
                                                    size="sm"
                                                    isDisabled
                                                    selectedKeys={[props.input.value]}
                                                />
                                            </div>
                                        )}
                                    </Field>
                                </div>
                            </FormRowsContainer.Row>
                            <FormRowsContainer.Row
                                title={intl.formatMessage({
                                    defaultMessage: "Translations",
                                    id: "aFyu8N",
                                })}
                            >
                                <FieldArray<
                                    WordFormType["translations"][number]
                                > name="translations">
                                    {({ fields }) => (
                                        <div className="flex flex-wrap items-center gap-2">
                                            <InlineWordTranslationsList
                                                translations={fields.value}
                                                onDeleteTranslation={(_, index) => {
                                                    fields.remove(index);
                                                }}
                                            />
                                            <AddWordTranslationsForm
                                                baseTranslationLanguage={baseTranslation.language}
                                                onSubmit={(translation, form) => {
                                                    fields.push(translation);
                                                    form.restart();
                                                }}
                                            />
                                        </div>
                                    )}
                                </FieldArray>
                            </FormRowsContainer.Row>
                        </FormRowsContainer>
                    </div>
                    <div>
                        <Button
                            color="primary"
                            size="sm"
                            isDisabled={submitting || !valid}
                            onPress={() => handleSubmit()}
                            isLoading={submitting}
                        >
                            {intl.formatMessage({
                                defaultMessage: "Add word",
                                id: "iTJyw/",
                            })}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    );
};
