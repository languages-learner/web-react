import React from "react";

import { block, classNames } from "@/shared/class-names";

import { FormRow, type FormRowProps } from "../FormRow";

import "./FormRowsContainer.scss";

const b = block("FormRowsContainer");

export interface FormRowsContainerProps extends React.PropsWithChildren {
    className?: string;
}

export const FormRowsContainer: React.FC<FormRowsContainerProps> & {
    Row: React.FC<FormRowProps>;
} = ({ className, children }) => {
    return (
        <div className={classNames(b(), className)}>
            {React.Children.map(children, (child) => {
                if (
                    React.isValidElement(child) &&
                    typeof child.type !== "string" // skip DOM elements like <div>
                ) {
                    const propsWithClassName = child.props as FormRowProps;

                    return React.cloneElement(child as React.ReactElement<FormRowProps>, {
                        className: classNames(b("row"), propsWithClassName.className),
                    });
                }

                return child;
            })}
        </div>
    );
};

FormRowsContainer.Row = FormRow;
