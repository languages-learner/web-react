import type { MoreViewProps } from "@gravity-ui/data-source";
import type { ButtonProps } from "@gravity-ui/uikit";

export interface MoreContainerProps
    extends MoreViewProps,
        Omit<ButtonProps, "isLoading" | "onClick"> {
    className?: string;
    innerClassName?: string;
}
