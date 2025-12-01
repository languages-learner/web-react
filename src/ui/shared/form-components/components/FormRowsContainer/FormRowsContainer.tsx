import React from "react";

import { classNames } from "@/shared/class-names";

export interface FormRowProps extends React.PropsWithChildren {
    title: React.ReactNode;
    className?: string;
}

const FormRow: React.FC<FormRowProps> = ({ title, className, children }) => {
    return (
        <div className={classNames("contents", className)}>
            <div className={"relative flex shrink-0 items-center"}>{title}</div>
            <div className={"grow"}>{children}</div>
        </div>
    );
};

export interface FormRowsContainerProps extends React.PropsWithChildren {
    className?: string;
}

export const FormRowsContainer: React.FC<FormRowsContainerProps> & {
    Row: React.FC<FormRowProps>;
} = ({ className, children }) => {
    return (
        <div className={classNames("grid grid-cols-[auto_1fr] gap-5", className)}>{children}</div>
    );
};

FormRowsContainer.Row = FormRow;
