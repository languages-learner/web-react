import type React from "react";

import { classNames } from "@/shared/class-names";
import {
    PlaceholderContainer,
    type PlaceholderContainerProps,
    PlaceholderContainerStatus,
} from "@/shared/ui";
import { type ApiError } from "shared/services/api";

import type { ErrorAction, ErrorViewProps } from "@gravity-ui/data-source";

interface CustomAction extends ErrorAction {
    text?: string;
}

export type ErrorContainerProps = Omit<Partial<PlaceholderContainerProps>, "action"> &
    Omit<ErrorViewProps<ApiError>, "action"> & {
        action?: CustomAction;
    };

export const ErrorContainer: React.FC<ErrorContainerProps> = (props) => {
    return (
        <PlaceholderContainer
            {...props}
            status={PlaceholderContainerStatus.Error}
            title={props.error?.message}
            description={props.error?.details}
            className={classNames("wrap-anywhere", props.className)}
        />
    );
};
