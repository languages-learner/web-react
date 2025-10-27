import { Checkbox as BaseCheckbox, type CheckboxProps } from "@heroui/checkbox";

import { block, classNames } from "@/shared/class-names";

import "./Checkbox.scss";

const b = block("checkbox");

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    return (
        <BaseCheckbox
            {...props}
            classNames={{
                ...props.classNames,
                wrapper: classNames(b(), props.classNames?.wrapper),
            }}
        />
    );
};
