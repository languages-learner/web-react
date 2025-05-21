import type { LoaderProps } from "@gravity-ui/uikit";

export interface LoaderContainerProps extends Omit<LoaderProps, "className"> {
    className?: string;
    innerClassName?: string;
}
