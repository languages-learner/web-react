import { type ApiError } from "@/shared/services/api";

import type { ErrorContainerProps } from "../ErrorContainer";
import type { LoaderContainerProps } from "../LoaderContainer";
import type { DataLoaderProps as DataLoaderPropsBase } from "@gravity-ui/data-source";

export interface DataLoaderProps
    extends Omit<
        DataLoaderPropsBase<ApiError, LoaderContainerProps, ErrorContainerProps>,
        "LoadingView" | "ErrorView"
    > {
    LoadingView?: React.ComponentType<LoaderContainerProps>;
    ErrorView?: React.ComponentType<ErrorContainerProps>;
}
