import React from "react";

import { DataInfiniteLoader as DataInfiniteLoaderBase } from "@gravity-ui/data-source";

import { ErrorContainer } from "../ErrorContainer";
import { LoaderContainer } from "../LoaderContainer";
import { MoreContainer } from "../MoreContainer";

import type { DataInfiniteLoaderProps } from "./types";

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
