import { Button, type ButtonProps } from "@heroui/button";

import { classNames } from "@/shared/class-names";

export type BasePlaceholderContainerActionProps = Omit<ButtonProps, "children"> & {
    text: string;
};

export interface BasePlaceholderContainerProps {
    title?: string;
    description?: React.ReactNode;
    image: React.ReactNode;
    actions?: BasePlaceholderContainerActionProps[];
    className?: string;
}

export const BasePlaceholderContainer: React.FC<BasePlaceholderContainerProps> = ({
    title,
    description,
    image,
    actions,
    className,
}) => {
    return (
        <div className={classNames("flex justify-center", className)}>
            <div
                className={classNames(
                    "gap-15 flex max-w-[600px] items-center justify-center p-7",
                    className,
                )}
            >
                <div>{image}</div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        {title ? <span className="font-bold text-medium">{title}</span> : null}
                        {description}
                    </div>
                    {actions?.length ? (
                        <div className="flex gap-2">
                            {actions?.map(({ text, ...buttonProps }, index) => (
                                <Button size="sm" {...buttonProps} key={index}>
                                    {text}
                                </Button>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
