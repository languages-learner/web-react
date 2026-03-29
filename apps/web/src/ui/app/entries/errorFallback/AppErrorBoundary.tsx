import React from "react";

import { errorFallbackMessages } from "./errorFallbackMessages";
import { ErrorFallbackView } from "./ErrorFallbackView";
import type { ErrorInfo, ReactNode } from "react";

import { intl } from "@/shared/i18n";
import { getPathWithCurrentLocale } from "@/shared/react-router";

type AppErrorBoundaryState = {
    error: Error | null;
};

export class AppErrorBoundary extends React.Component<
    { children: ReactNode },
    AppErrorBoundaryState
> {
    state: AppErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        if (import.meta.env.DEV) {
            console.error("AppErrorBoundary", error, info);
        }
    }

    render() {
        if (this.state.error) {
            const errorDetail = import.meta.env.DEV
                ? (this.state.error.stack ?? this.state.error.message)
                : undefined;

            return (
                <ErrorFallbackView
                    title={intl.formatMessage(errorFallbackMessages.title)}
                    description={intl.formatMessage(errorFallbackMessages.description)}
                    errorDetail={errorDetail}
                    reloadLabel={intl.formatMessage(errorFallbackMessages.reload)}
                    homeLabel={intl.formatMessage(errorFallbackMessages.home)}
                    onReload={() => window.location.reload()}
                    onGoHome={() => {
                        window.location.assign(getPathWithCurrentLocale("/"));
                    }}
                />
            );
        }

        return this.props.children;
    }
}
