import React from "react";

import { classNames } from "@languages-learner/class-names";
import { Loader } from "@languages-learner/uikit";
import type { LoaderProps } from "@languages-learner/uikit";

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
