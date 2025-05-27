import React from "react";

import { Flex } from "@gravity-ui/uikit";

import { block, classNames } from "@/shared/classNames";

import "./FormRow.scss";

const b = block("form-row");

export interface FormRowProps extends React.PropsWithChildren {
    title?: React.ReactNode;
    className?: string;
}

export const FormRow: React.FC<FormRowProps> = ({ title, className, children }) => {
    return (
        <Flex className={classNames(b(), className)} gap={3}>
            <Flex className={b("left")} alignItems={"center"}>
                {title}
            </Flex>
            <div className={b("right")}>{children}</div>
        </Flex>
    );
};
