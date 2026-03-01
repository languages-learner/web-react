import { Checkbox as BaseCheckbox } from "@heroui/checkbox";
import { block, classNames } from "@languages-learner/class-names";
import type { CheckboxProps } from "@heroui/checkbox";

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
