import { type ApiError } from "@/shared/services/api";

import { type ErrorContainerProps } from "../ErrorContainer";

import type { LoaderContainerProps } from "../LoaderContainer";
import type { MoreContainerProps } from "../MoreContainer";
import type { DataInfiniteLoaderProps as DataInfiniteLoaderPropsBase } from "@gravity-ui/data-source";

export interface DataInfiniteLoaderProps
    extends Omit<
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
