import React from "react";

import { DataLoader as DataLoaderBase } from "@gravity-ui/data-source";

import { type ApiError } from "shared/services/api";

import { ErrorContainer } from "./ErrorContainer";
import { LoaderContainer } from "./LoaderContainer";

import type { ErrorContainerProps } from "./ErrorContainer";
import type { LoaderContainerProps } from "./LoaderContainer";
import type { DataLoaderProps as DataLoaderPropsBase } from "@gravity-ui/data-source";

export interface DataLoaderProps
    extends Omit<
        DataLoaderPropsBase<ApiError, LoaderContainerProps, ErrorContainerProps>,
        "LoadingView" | "ErrorView"
    > {
    LoadingView?: React.ComponentType<LoaderContainerProps>;
    ErrorView?: React.ComponentType<ErrorContainerProps>;
}

export const DataLoader: React.FC<DataLoaderProps> = ({
    LoadingView = LoaderContainer,
    ErrorView = ErrorContainer,
    ...restProps
}) => {
    return <DataLoaderBase LoadingView={LoadingView} ErrorView={ErrorView} {...restProps} />;
};
