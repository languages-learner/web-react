import { useIntl } from "react-intl";
import { isRouteErrorResponse, useRouteError } from "react-router";

import { errorFallbackMessages } from "./errorFallbackMessages";
import { ErrorFallbackView } from "./ErrorFallbackView";

import { useNavigate } from "@/shared/react-router";

const getErrorDetail = (error: unknown): string | undefined => {
    if (!import.meta.env.DEV) {
        return undefined;
    }
    if (error instanceof Error) {
        return error.stack ?? error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    try {
        return JSON.stringify(error, null, 2);
    } catch {
        return String(error);
    }
};

export const RouteErrorFallback = () => {
    const error = useRouteError();
    const intl = useIntl();
    const navigate = useNavigate();

    let title = intl.formatMessage(errorFallbackMessages.title);
    let description = intl.formatMessage(errorFallbackMessages.description);

    if (isRouteErrorResponse(error)) {
        title = error.statusText ? `${error.status} ${error.statusText}` : String(error.status);
        description =
            typeof error.data === "string" && error.data
                ? error.data
                : intl.formatMessage(errorFallbackMessages.routeErrorDescription);
    }

    return (
        <ErrorFallbackView
            title={title}
            description={description}
            errorDetail={getErrorDetail(error)}
            reloadLabel={intl.formatMessage(errorFallbackMessages.reload)}
            homeLabel={intl.formatMessage(errorFallbackMessages.home)}
            onReload={() => window.location.reload()}
            onGoHome={() => {
                navigate("/");
            }}
        />
    );
};
