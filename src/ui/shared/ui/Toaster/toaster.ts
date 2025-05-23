import { toaster as baseToaster } from "@gravity-ui/uikit/toaster-singleton";

import type { ToastProps } from "@gravity-ui/uikit";

const DEFAULT_TOAST_TIMEOUT = 5000;

export type CustomToastProps = Omit<ToastProps, "theme">;

export const toaster = {
    destroy: baseToaster.destroy,
    remove: baseToaster.remove,
    removeAll: baseToaster.removeAll,
    update: baseToaster.update,
    has: baseToaster.has,
    subscribe: baseToaster.subscribe,
    createNormalToast: (props: CustomToastProps) => {
        return baseToaster.add({
            theme: "normal",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...props,
        });
    },
    createInfoToast: (props: CustomToastProps) => {
        return baseToaster.add({
            theme: "info",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...props,
        });
    },
    createSuccessToast: (props: CustomToastProps) => {
        return baseToaster.add({
            theme: "success",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...props,
        });
    },
    createWarningToast: (props: CustomToastProps) => {
        return baseToaster.add({
            theme: "warning",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...props,
        });
    },
    createErrorToast: (props: CustomToastProps) => {
        return baseToaster.add({
            theme: "danger",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...props,
        });
    },
    createUtilityToast: (props: CustomToastProps) => {
        return baseToaster.add({
            theme: "utility",
            autoHiding: DEFAULT_TOAST_TIMEOUT,
            ...props,
        });
    },
} as const;
