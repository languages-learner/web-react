import React from "react";

import { Button } from "@heroui/button";
import { classNames } from "@languages-learner/class-names";

import { intl } from "../shared/i18n";
import type { ButtonProps } from "@heroui/button";

import type { MoreViewProps } from "@gravity-ui/data-source";

export interface MoreContainerProps extends MoreViewProps, React.PropsWithChildren {
    className?: string;
    buttonProps?: Omit<ButtonProps, "isLoading" | "onPress" | "children">;
}

export const MoreContainer: React.FC<MoreContainerProps> = ({
    isLoading,
    onClick,
    className,
    children = <div>{intl.formatMessage({ defaultMessage: "Show more", id: "aWpBzj" })}</div>,
    buttonProps,
}) => {
    return (
        <div className={classNames("flex justify-center", className)}>
            <Button
                variant="solid"
                size="sm"
                {...buttonProps}
                isLoading={isLoading}
                onPress={onClick}
            >
                {children}
            </Button>
        </div>
    );
};
