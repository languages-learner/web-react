import React from "react";

import { DataInfiniteLoader as DataInfiniteLoaderBase } from "@gravity-ui/data-source";

import { ErrorContainer } from "./ErrorContainer";
import { LoaderContainer } from "./LoaderContainer";
import { MoreContainer } from "./MoreContainer";
import type { ErrorContainerProps } from "./ErrorContainer";
import type { ApiError } from "@languages-learner/api";

import type { LoaderContainerProps } from "./LoaderContainer";
import type { MoreContainerProps } from "./MoreContainer";
import type { DataInfiniteLoaderProps as DataInfiniteLoaderPropsBase } from "@gravity-ui/data-source";

export interface DataInfiniteLoaderProps extends Omit<
    DataInfiniteLoaderPropsBase<
        ApiError,
        LoaderContainerProps,
        ErrorContainerProps,
        MoreContainerProps
    >,
    "LoadingView" | "ErrorView" | "MoreView"
> {
    LoadingView?: React.ComponentType<LoaderContainerProps>;
    ErrorView?: React.ComponentType<ErrorContainerProps>;
    MoreView?: React.ComponentType<MoreContainerProps>;
}

export const DataInfiniteLoader: React.FC<DataInfiniteLoaderProps> = ({
    LoadingView = LoaderContainer,
    ErrorView = ErrorContainer,
    MoreView = MoreContainer,
    ...restProps
}) => {
    return (
        <DataInfiniteLoaderBase
            LoadingView={LoadingView}
            ErrorView={ErrorView}
            MoreView={MoreView}
            {...restProps}
        />
    );
};
