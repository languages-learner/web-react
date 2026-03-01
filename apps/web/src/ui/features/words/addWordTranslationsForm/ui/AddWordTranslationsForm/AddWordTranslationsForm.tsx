import React from "react";

import { Button } from "@heroui/button";
import { FormTextInput } from "@languages-learner/form-components";
import { Field, Form } from "react-final-form";
import { validateTranslation } from "./lib";
import type { FormProps } from "react-final-form";

import type { AddWordTranslationFormType } from "./lib";

import { useUserSafe } from "@/entities/user";
import { LanguageSelector } from "@/features/language/languageSelector";
import { intl } from "@/shared/i18n";
import { getShortLanguageName } from "@/shared/languages";

export interface AddWordTranslationsFormProps extends FormProps<AddWordTranslationFormType> {
    contentClassName?: string;
    baseTranslationLanguage: string;
}

export const AddWordTranslationsForm: React.FC<AddWordTranslationsFormProps> = ({
    baseTranslationLanguage,
    ...formProps
}) => {
    const { user } = useUserSafe();

    return (
        <Form<AddWordTranslationFormType>
            {...formProps}
            validate={validateTranslation}
            initialValues={{
                text: "",
                language: baseTranslationLanguage,
            }}
        >
            {({ submitting, handleSubmit, valid }) => (
                <div className="flex gap-2">
                    <Field name={"text"}>
                        {(props) => (
                            <FormTextInput
                                size="sm"
                                variant="bordered"
                                fieldProps={props}
                                placeholder={intl.formatMessage({
                                    defaultMessage: "Translation",
                                    id: "/vCXIP",
                                })}
                                className="w-[130px]"
                                isClearable
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
                            <div>
                                <LanguageSelector
                                    size="sm"
                                    isVirtualized
                                    disallowEmptySelection
                                    selectedKeys={[props.input.value]}
                                    onSelectionChange={(value) => {
                                        if (value.currentKey) {
                                            props.input.onChange(value.currentKey);
                                        }
                                    }}
                                    classNames={{
                                        innerWrapper: "w-full pr-6",
                                    }}
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
                            </div>
                        )}
                    </Field>
                    <Button
                        color="primary"
                        size="sm"
                        isDisabled={!valid}
                        onPress={() => handleSubmit()}
                        isLoading={submitting}
                    >
                        {intl.formatMessage({
                            defaultMessage: "Add",
                            id: "2/2yg+",
                        })}
                    </Button>
                </div>
            )}
        </Form>
    );
};
