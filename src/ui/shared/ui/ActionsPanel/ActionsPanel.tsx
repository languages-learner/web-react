import { Button } from "@heroui/button";
import { BiX } from "react-icons/bi";

import { classNames } from "@/shared/class-names";

export interface ActionsPanelProps {
    note?: string;
    actions?: React.ReactNode[];
    onClose?: () => unknown;
    className?: string;
    style?: React.CSSProperties;
}

export const ActionsPanel: React.FC<ActionsPanelProps> = ({
    note,
    actions,
    onClose,
    className,
    style,
}) => {
    return (
        <div
            className={classNames(
                "h-(--app-actions-panel-height) flex items-center justify-between gap-10 rounded-lg bg-primary px-5 py-1 text-primary-foreground",
                className,
            )}
            style={style}
        >
            <div className="flex items-center gap-20">
                {note ? <span className="font-semibold text-medium">{note}</span> : null}
                {actions}
            </div>
            <Button
                size="sm"
                variant="light"
                isIconOnly
                onPress={onClose}
                className="text-primary-foreground"
            >
                <BiX size={16} />
            </Button>
        </div>
    );
};
