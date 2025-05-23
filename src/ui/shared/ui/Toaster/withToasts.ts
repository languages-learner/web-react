import { getErrorMessage } from "@/shared/error";

import { type CustomToastProps, toaster } from "./toaster";

export interface WithToastsOptions {
    name: string;
    success?: string | Omit<CustomToastProps, "name">;
    error?: string | Omit<CustomToastProps, "name" | "content">;
}

export async function withToasts<T>(
    promise: Promise<T>,
    opts: WithToastsOptions,
): Promise<T> {
    const { name, success, error } = opts;

    try {
        const result = await promise;

        if (success) {
            if (typeof success === "string") {
                toaster.createSuccessToast({
                    name,
                    title: success,
                });
            } else {
                toaster.createSuccessToast({
                    name,
                    ...success,
                });
            }
        }

        return result;
    } catch (e) {
        if (error) {
            if (typeof error === "string") {
                toaster.createErrorToast({
                    name,
                    title: error,
                    content: getErrorMessage(e),
                });
            } else {
                toaster.createErrorToast({
                    name,
                    ...error,
                    content: getErrorMessage(e),
                });
            }
        }

        throw e;
    }
}
