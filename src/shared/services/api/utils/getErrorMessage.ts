import { type ApiError } from "../types";

export const getErrorMessage = (error: ApiError): string => {
    return error.message || error.details || error.name;
};
