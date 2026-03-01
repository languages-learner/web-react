import { getErrorMessage } from "@languages-learner/error-utils";

import { toaster } from "./toaster";
import type { CustomToastProps } from "./toaster";

export interface WithToastsOptions {
    success?: string | Omit<CustomToastProps, "name">;
    error?: string | Omit<CustomToastProps, "name" | "content">;
}

export async function withToasts<T>(promise: Promise<T>, opts: WithToastsOptions): Promise<T> {
    const { success, error } = opts;

    try {
        const result = await promise;

        if (success) {
            if (typeof success === "string") {
                toaster.createSuccessToast({ title: success });
            } else {
                toaster.createSuccessToast({
                    ...success,
                });
            }
        }

        return result;
    } catch (e) {
        if (error) {
            if (typeof error === "string") {
                toaster.createErrorToast({
                    title: error,
                    description: getErrorMessage(e),
                });
            } else {
                toaster.createErrorToast({
                    ...error,
                    description: getErrorMessage(e),
                });
            }
        }

        throw e;
    }
}
