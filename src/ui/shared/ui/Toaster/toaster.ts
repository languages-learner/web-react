import { toaster as baseToaster } from "@gravity-ui/uikit/toaster-singleton";

import { getErrorMessage } from "@/shared/error";

import type { ToastProps } from "@gravity-ui/uikit";

const DEFAULT_TOAST_TIMEOUT = 5000;

// TODO: Fix type
export const toaster = {
    destroy: baseToaster.destroy,
    remove: baseToaster.remove,
    removeAll: baseToaster.removeAll,
    update: baseToaster.update,
    has: baseToaster.has,
    subscribe: baseToaster.subscribe,
    createNormalToast: (
        name: string,
        title: string,
        opts?: Partial<ToastProps>,
    ) => {
        return baseToaster.add({
            name,
            title,
            theme: "normal",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...opts,
        });
    },
    createInfoToast: (
        name: string,
        title: string,
        opts?: Partial<ToastProps>,
    ) => {
        return baseToaster.add({
            name,
            title,
            theme: "info",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...opts,
        });
    },
    createSuccessToast: (
        name: string,
        title: string,
        opts?: Partial<ToastProps>,
    ) => {
        return baseToaster.add({
            name,
            title,
            theme: "success",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...opts,
        });
    },
    createWarningToast: (
        name: string,
        title: string,
        opts?: Partial<ToastProps>,
    ) => {
        return baseToaster.add({
            name,
            title,
            theme: "warning",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...opts,
        });
    },
    createErrorToast: (
        name: string,
        title: string,
        error?: unknown,
        opts?: Partial<ToastProps>,
    ) => {
        return baseToaster.add({
            name,
            title,
            theme: "danger",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            content: getErrorMessage(error),
            ...opts,
        });
    },
    createUtilityToast: (
        name: string,
        title: string,
        opts?: Partial<ToastProps>,
    ) => {
        return baseToaster.add({
            name,
            title,
            theme: "utility",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...opts,
        });
    },
} as const;

export interface WithToastsOptions {
    id: string;
    successText?: string;
    errorText?: string;
}

export async function withToasts<T>(
    promise: Promise<T>,
    opts: WithToastsOptions,
): Promise<T> {
    const { id, successText, errorText } = opts;

    try {
        const result = await promise;

        if (successText) {
            toaster.createSuccessToast(id, successText);
        }

        return result;
    } catch (error) {
        if (errorText) {
            toaster.createErrorToast(id, errorText, error);
        }

        throw error;
    }
}
