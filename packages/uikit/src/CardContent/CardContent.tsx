import React from "react";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { classNames } from "@languages-learner/class-names";
import { BiX } from "react-icons/bi";
import type { CardProps } from "@heroui/card";

export type CardContentProps = Pick<CardProps, "children" | "className" | "classNames"> & {
    title?: string;
    closable?: boolean;
    onClose?: () => void;
};

export const CardContent: React.FC<CardContentProps> = ({
    title,
    closable,
    onClose,
    children,
    ...cardProps
}) => {
    const hasHeader = Boolean(title) || closable;

    return (
        <Card
            {...cardProps}
            shadow={"none"}
            classNames={{
                base: classNames("p-2", cardProps.classNames?.base),
            }}
        >
            {hasHeader ? (
                <CardHeader>
                    <div className="flex w-full items-center justify-between">
                        {title ? <h3 className="text-lg font-bold">{title}</h3> : null}
                        {closable ? (
                            <Button variant="light" isIconOnly onPress={onClose} size="sm">
                                <BiX size={16} />
                            </Button>
                        ) : null}
                    </div>
                </CardHeader>
            ) : null}
            <CardBody>{children}</CardBody>
        </Card>
    );
};
