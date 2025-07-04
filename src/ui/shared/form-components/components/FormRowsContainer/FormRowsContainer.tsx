import React from "react";

import { block, classNames } from "@/shared/class-names";

import { FormRow, type FormRowProps } from "../FormRow";

import "./FormRowsContainer.scss";

const b = block("FormRowsContainer");

export interface FormRowsContainerProps extends React.PropsWithChildren {
    className?: string;
}

const processChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }

        const childProps = child.props as FormRowProps;

        // Handle React.Fragment by recursively processing its children
        if (child.type === React.Fragment) {
            return processChildren(childProps.children);
        }

        // Skip DOM elements like <div>
        if (typeof child.type === "string") {
            return child;
        }

        return React.cloneElement(child as React.ReactElement<FormRowProps>, {
            className: classNames(b("row"), childProps.className),
        });
    });
};

export const FormRowsContainer: React.FC<FormRowsContainerProps> & {
    Row: React.FC<FormRowProps>;
} = ({ className, children }) => {
    return <div className={classNames(b(), className)}>{processChildren(children)}</div>;
};

FormRowsContainer.Row = FormRow;
