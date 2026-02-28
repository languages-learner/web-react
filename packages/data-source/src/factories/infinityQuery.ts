import { makeInfiniteQueryDataSource as makeInfiniteQueryDataSourceBase } from "@gravity-ui/data-source";
import type { InfiniteQueryDataSource } from "@gravity-ui/data-source";
import type { ApiError } from "@languages-learner/api";

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
