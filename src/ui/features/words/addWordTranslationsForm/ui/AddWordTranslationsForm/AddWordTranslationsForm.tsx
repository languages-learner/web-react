import React from "react";

import { Button, Flex } from "@gravity-ui/uikit";
import { Field, Form, type FormProps } from "react-final-form";

import { useUserSafe } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { block } from "@/shared/classNames";
import { FormTextInput } from "@/shared/form-components";
import { intl } from "@/shared/i18n";
import { getShortLanguageName } from "@/shared/languages";

import { type AddWordTranslationFormType, validateTranslation } from "./lib";

import "./AddWordTranslationsForm.scss";

export interface AddWordTranslationsFormProps extends FormProps<AddWordTranslationFormType> {
    contentClassName?: string;
    baseTranslationLanguage: string;
}

const b = block("AddWordTranslationsForm");

export const AddWordTranslationsForm: React.FC<AddWordTranslationsFormProps> = ({
    baseTranslationLanguage,
    ...formProps
}) => {
    const { user } = useUserSafe();

    return (
        <Form<AddWordTranslationFormType>
            {...formProps}
            validate={validateTranslation}
            className={b()}
            initialValues={{
                text: "",
                language: baseTranslationLanguage,
            }}
        >
            {({ submitting, handleSubmit, valid }) => (
                <Flex gap={2}>
                    <Field name={"text"}>
                        {(props) => (
                            <FormTextInput
                                fieldProps={props}
                                placeholder={intl.formatMessage({
                                    defaultMessage: "Translation",
                                    id: "/vCXIP",
                                })}
                                className={b("TextInput")}
                                onKeyDown={(data) => {
                                    if (valid && data.code === "Enter") {
                                        handleSubmit();
                                    }
                                }}
                            />
                        )}
                    </Field>

                    <Field name="language">
                        {(props) => (
                            <LanguageSelector
                                value={[props.input.value]}
                                onUpdate={(values) => props.input.onChange(values[0])}
                                filterable
                                className={b("FormSelector")}
                                overrideLanguageName={(language) => {
                                    return language === user.nativeLanguage
                                        ? intl.formatMessage(
                                              {
                                                  defaultMessage: "{lang} (Native)",
                                                  id: "tpGxc3",
                                              },
                                              {
                                                  lang: getShortLanguageName(language),
                                              },
                                          )
                                        : null;
                                }}
                            />
                        )}
                    </Field>
                    <Button
                        view="action"
                        size="m"
                        disabled={!valid}
                        onClick={handleSubmit}
                        loading={submitting}
                    >
                        {intl.formatMessage({
                            defaultMessage: "Add",
                            id: "2/2yg+",
                        })}
                    </Button>
                </Flex>
            )}
        </Form>
    );
};
