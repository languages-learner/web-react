import { Button } from "@heroui/button";

export type ErrorFallbackViewProps = {
    title: string;
    description: string;
    errorDetail?: string;
    reloadLabel: string;
    homeLabel: string;
    onReload: () => void;
    onGoHome: () => void;
};

export const ErrorFallbackView = ({
    title,
    description,
    errorDetail,
    reloadLabel,
    homeLabel,
    onReload,
    onGoHome,
}: ErrorFallbackViewProps) => {
    return (
        <div
            className={"flex h-screen w-full flex-col items-center justify-center gap-6 px-4"}
            role={"alert"}
        >
            <div className={"flex max-w-md flex-col gap-3 text-center"}>
                <h1 className={"text-2xl font-semibold text-foreground"}>{title}</h1>
                <p className={"text-default-600"}>{description}</p>
                {import.meta.env.DEV && errorDetail ? (
                    <pre
                        className={
                            "max-h-40 overflow-auto rounded-medium bg-content2 p-3 text-left text-xs"
                        }
                        tabIndex={0}
                    >
                        {errorDetail}
                    </pre>
                ) : null}
            </div>
            <div className={"flex flex-wrap items-center justify-center gap-3"}>
                <Button color={"primary"} onPress={onReload}>
                    {reloadLabel}
                </Button>
                <Button variant={"bordered"} onPress={onGoHome}>
                    {homeLabel}
                </Button>
            </div>
        </div>
    );
};
