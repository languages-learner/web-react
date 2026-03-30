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
                <div className="flex w-full min-w-0 flex-col gap-2 md:flex-row md:items-end md:gap-2">
                    <div className="w-full min-w-0 md:w-[130px] md:shrink-0">
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
                                    className="w-full"
                                    isClearable
                                    onKeyDown={(data) => {
                                        if (valid && data.code === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                            )}
                        </Field>
                    </div>

                    <div className="flex w-full min-w-0 flex-row items-end gap-2 md:w-auto">
                        <Field name="language">
                            {(props) => (
                                <div className="min-w-0 flex-1 md:flex-initial">
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
                                            base: "w-full min-w-0 md:w-fit",
                                            innerWrapper: "w-full min-w-0 pr-6 md:w-auto",
                                            trigger: "w-full md:w-auto",
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
                            className="shrink-0"
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
                </div>
            )}
        </Form>
    );
};
