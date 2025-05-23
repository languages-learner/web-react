type ErrorWithMessage = {
    message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
    return (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as Record<string, unknown>).message === "string"
    );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
    if (isErrorWithMessage(maybeError)) return maybeError;

    if (typeof maybeError === "string" && maybeError) {
        return new Error(maybeError);
    }

    if (!maybeError) {
        return new Error(
            "Произошла непредвиденная ошибка. Попробуйте обновить страницу через некоторое время.",
        );
    }

    try {
        return new Error(JSON.stringify(maybeError));
    } catch {
        return new Error(String(maybeError));
    }
};

export function getErrorMessage(error: unknown) {
    return toErrorWithMessage(error).message;
}
