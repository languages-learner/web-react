import {
    type InfiniteQueryDataSource,
    makeInfiniteQueryDataSource as makeInfiniteQueryDataSourceBase,
} from "@gravity-ui/data-source";

import { type ApiError } from "shared/services/api";

export const makeInfiniteQuery = <
    TParams,
    TRequest,
    TResponse,
    TData,
    TError = ApiError,
    TErrorResponse = unknown,
>(
    config: Omit<
        InfiniteQueryDataSource<TParams, TRequest, TResponse, TData, TError, TErrorResponse>,
        "type"
    >,
): InfiniteQueryDataSource<TParams, TRequest, TResponse, TData, TError, TErrorResponse> => {
    return makeInfiniteQueryDataSourceBase(config);
};
