import { makePlainQueryDataSource } from "@gravity-ui/data-source";
import type { PlainQueryDataSource } from "@gravity-ui/data-source";

import type { ApiError } from "@languages-learner/api";

export const makePlainQuery = <
    TParams,
    TRequest,
    TResponse,
    TData,
    TError = ApiError,
    TErrorResponse = unknown,
>(
    config: Omit<
        PlainQueryDataSource<TParams, TRequest, TResponse, TData, TError, TErrorResponse>,
        "type"
    >,
): PlainQueryDataSource<TParams, TRequest, TResponse, TData, TError, TErrorResponse> => {
    return makePlainQueryDataSource(config);
};
