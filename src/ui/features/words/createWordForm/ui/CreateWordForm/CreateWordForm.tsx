import React from "react";

import { Button, Flex } from "@gravity-ui/uikit";
import arrayMutators from "final-form-arrays";
import { Field, Form, type FormProps } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

import { LanguageSelector } from "@/features/language/languageSelector";
import { AddWordTranslationsForm } from "@/features/words/addWordTranslationsForm";
import { InlineWordTranslationsList } from "@/features/words/inlineWordTranslationsList";
import { block } from "@/shared/classNames";
import { FormRow, FormTextInput } from "@/shared/form-components";
import { intl } from "@/shared/i18n";

import { type WordFormType, validateWord } from "./lib";

import "./CreateWordForm.scss";

export interface CreateWordFormProps extends FormProps<WordFormType> {
    contentClassName?: string;
    baseTranslation: WordFormType["translations"][number];
}

const b = block("CreateWordForm");

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
            className={b()}
        >
            {({ submitting, handleSubmit, valid }) => (
                <React.Fragment>
                    <Flex
                        direction={"column"}
                        gap={3}
                        style={{ maxWidth: 500 }}
                        className={contentClassName}
                    >
                        <FormRow
                            title={intl.formatMessage({
                                defaultMessage: "Source word",
                                id: "R1QL2E",
                            })}
                        >
                            <Flex gap={3}>
                                <Field<string> name={"source.text"}>
                                    {(props) => <FormTextInput fieldProps={props} autoFocus />}
                                </Field>
                                <Field name={"source.language"}>
                                    {(props) => (
                                        <LanguageSelector
                                            disabled
                                            value={[props.input.value]}
                                            onUpdate={(values) => props.input.onChange(values[0])}
                                            className={b("FormSelector")}
                                            filterable
                                        />
                                    )}
                                </Field>
                            </Flex>
                        </FormRow>

                        <FieldArray<WordFormType["translations"][number]> name="translations">
                            {({ fields }) => (
                                <FormRow
                                    title={intl.formatMessage({
                                        defaultMessage: "Translations",
                                        id: "aFyu8N",
                                    })}
                                >
                                    <Flex gap={2} alignItems={"center"} wrap={"wrap"}>
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
                                    </Flex>
                                </FormRow>
                            )}
                        </FieldArray>
                    </Flex>
                    <div>
                        <Button
                            view="action"
                            size="l"
                            disabled={submitting || !valid}
                            onClick={handleSubmit}
                            loading={submitting}
                        >
                            {intl.formatMessage({
                                defaultMessage: "Add word",
                                id: "iTJyw/",
                            })}
                        </Button>
                    </div>
                </React.Fragment>
            )}
        </Form>
    );
};
