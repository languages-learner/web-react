import { BiCheck, BiCheckDouble } from "react-icons/bi";
import { type IconBaseProps, type IconType } from "react-icons/lib";

import { classNames } from "@/shared/class-names";

import type { ApiDatabase } from "shared/services/api";

const WORD_STATUS_TO_ICON: Record<
    ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
    IconType
> = {
    New: BiCheck,
    Learn: BiCheck,
    Learned: BiCheckDouble,
};

const WORD_STATUS_ICON_CLASS_NAME: Record<
    ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
    string
> = {
    New: "text-[hsl(var(--app-default-400))]",
    Learn: "text-[hsl(var(--app-warning))]",
    Learned: "text-[hsl(var(--app-success))]",
};

export interface WordStatusIconProps extends IconBaseProps {
    status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
}

export const WordStatusIcon: React.FC<WordStatusIconProps> = ({ status, ...iconProps }) => {
    const icon = WORD_STATUS_TO_ICON[status];

    return icon({
        ...iconProps,
        className: classNames(iconProps.className, WORD_STATUS_ICON_CLASS_NAME[status]),
    });
};
