import React from "react";

import { Xmark } from "@gravity-ui/icons";
import { Button, Card, type CardProps, Flex, Icon, Text, spacing } from "@gravity-ui/uikit";

export type CardContentProps = CardProps & {
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
        <Card {...cardProps}>
            <Flex className={spacing({ p: 6 })} direction={"column"} gap={8}>
                {hasHeader ? (
                    <Flex justifyContent={"space-between"}>
                        {title ? <Text variant="subheader-3">{title}</Text> : null}
                        {closable ? (
                            <Button view="flat" onClick={onClose}>
                                <Button.Icon>
                                    <Icon data={Xmark} />
                                </Button.Icon>
                            </Button>
                        ) : null}
                    </Flex>
                ) : null}
                {children}
            </Flex>
        </Card>
    );
};
