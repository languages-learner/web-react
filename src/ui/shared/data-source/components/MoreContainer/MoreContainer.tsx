import React from "react";

import { ArrowDown } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";

import { classNames } from "@/shared/classNames";

import type { MoreContainerProps } from "./types";

import styles from "./MoreContainer.module.scss";

export const MoreContainer: React.FC<MoreContainerProps> = ({
    className,
    innerClassName,
    isLoading,
    onClick,
    view = "flat-secondary",
    children = <div>Show more</div>,
    ...restProps
}) => {
    const button = (
        // TODO: Fix type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Button
            {...restProps}
            view={view}
            loading={isLoading}
            onClick={onClick}
            className={innerClassName}
        >
            {children}
        </Button>
    );

    return <div className={classNames(styles.MoreContainer, className)}>{button}</div>;
};

export const EmptyMoreContainer: React.FC<MoreContainerProps> = () => null;

export const MoreContainerWithArrow: React.FC<Omit<MoreContainerProps, "children">> = (props) => {
    return (
        <MoreContainer {...props}>
            <Icon data={ArrowDown} /> {"Show more"}
        </MoreContainer>
    );
};
