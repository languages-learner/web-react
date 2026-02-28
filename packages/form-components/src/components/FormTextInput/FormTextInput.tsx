import { Input } from "@heroui/input";
import type { InputProps } from "@heroui/input";
import type { FieldRenderProps } from "react-final-form";

export type FormTextInputProps = Omit<InputProps, "value" | "onValueChange" | "errorMessage"> & {
    fieldProps: FieldRenderProps<string, HTMLElement, string>;
};

export const FormTextInput: React.FC<FormTextInputProps> = ({ fieldProps, ...textInputProps }) => {
    const isModified = fieldProps.meta.modified;

    return (
        <Input
            {...textInputProps}
            value={fieldProps.input.value}
            onValueChange={fieldProps.input.onChange}
            errorMessage={isModified ? fieldProps.meta.error?.errors?.[0] : null}
            isInvalid={isModified && fieldProps.meta.error?.errors?.[0]}
        />
    );
};
