import React from "react";

import { Button } from "@heroui/button";
import { classNames } from "@languages-learner/class-names";
import { FormRowsContainer, FormTextInput } from "@languages-learner/form-components";
import arrayMutators from "final-form-arrays";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

import { validateWord } from "./lib";
import type { FormProps } from "react-final-form";
import type { WordFormType } from "./lib";

import { LanguageSelector } from "@/features/language/languageSelector";
import { AddWordTranslationsForm } from "@/features/words/addWordTranslationsForm";
import { InlineWordTranslationsList } from "@/features/words/inlineWordTranslationsList";
import { intl } from "@/shared/i18n";

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
                            "flex w-full min-w-0 max-w-full flex-col gap-3 md:max-w-[500px]",
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
                                <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-end">
                                    <div className="min-w-0 flex-1">
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
                                    </div>
                                    <Field name={"source.language"}>
                                        {(props) => (
                                            <div className="w-full shrink-0 md:w-auto">
                                                <LanguageSelector
                                                    classNames={{
                                                        base: "w-full min-w-0 md:w-fit",
                                                        innerWrapper:
                                                            "w-full min-w-0 pr-6 md:w-auto",
                                                        trigger: "w-full md:w-auto",
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
