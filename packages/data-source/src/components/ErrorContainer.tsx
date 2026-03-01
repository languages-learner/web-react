import { classNames } from "@languages-learner/class-names";
import { PlaceholderContainer, PlaceholderContainerStatus } from "@languages-learner/uikit";
import type { ApiError } from "@languages-learner/api";
import type { PlaceholderContainerProps } from "@languages-learner/uikit";
import type React from "react";

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
