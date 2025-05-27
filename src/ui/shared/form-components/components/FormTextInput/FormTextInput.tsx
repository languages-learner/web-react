import { TextInput, type TextInputProps } from "@gravity-ui/uikit";
import { type FieldRenderProps } from "react-final-form";

export type FormTextInputProps = Omit<TextInputProps, "value" | "onUpdate" | "error"> & {
    fieldProps: FieldRenderProps<string, HTMLElement, string>;
};

export const FormTextInput: React.FC<FormTextInputProps> = ({ fieldProps, ...textInputProps }) => {
    const isModified = fieldProps.meta.modified;

    return (
        <TextInput
            {...textInputProps}
            value={fieldProps.input.value}
            onUpdate={fieldProps.input.onChange}
            error={isModified ? fieldProps.meta.error?.errors?.[0] : null}
        />
    );
};
