import { addToast } from "@heroui/toast";

const DEFAULT_TOAST_TIMEOUT = 5000;

export type CustomToastProps = Omit<Parameters<typeof addToast>[0], "variant" | "color">;

export const toaster = {
    createSuccessToast: (props: CustomToastProps) => {
        return addToast({
            variant: "flat",
            color: "success",
            timeout: DEFAULT_TOAST_TIMEOUT,
            ...props,
        });
    },
    createErrorToast: (props: CustomToastProps) => {
        return addToast({
            variant: "flat",
            color: "danger",
            timeout: DEFAULT_TOAST_TIMEOUT,
            ...props,
        });
    },
} as const;
