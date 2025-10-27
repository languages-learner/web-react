import React from "react";

import { classNames } from "@/shared/class-names";
import { Loader, type LoaderProps } from "@/shared/ui";

export interface LoaderContainerProps extends Pick<LoaderProps, "size"> {
    className?: string;
}

export const LoaderContainer: React.FC<LoaderContainerProps> = ({ className, ...restProps }) => {
    return (
        <div
            className={classNames(
                "flex h-full w-full flex-auto items-center justify-center",
                className,
            )}
        >
            <Loader size="md" {...restProps} />
        </div>
    );
};
