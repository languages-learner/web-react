import React from "react";

import { Loader } from "@gravity-ui/uikit";

import { classNames } from "@/shared/class-names";

import type { LoaderContainerProps } from "./types";

import styles from "./LoaderContainer.module.scss";

export const LoaderContainer: React.FC<LoaderContainerProps> = ({
    className,
    innerClassName,
    ...restProps
}) => {
    return (
        <div className={classNames(styles.LoaderContainer, className)}>
            <Loader {...restProps} className={innerClassName} />
        </div>
    );
};
