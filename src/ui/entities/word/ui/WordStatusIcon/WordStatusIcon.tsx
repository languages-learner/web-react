import { Check } from "@gravity-ui/icons";
import { Icon, type IconData, type IconProps } from "@gravity-ui/uikit";

import { block, classNames } from "@/shared/classNames";

import type { ApiDatabase } from "@/shared/services/api";

import "./WordStatusIcon.scss";

const WORD_STATUS_TO_ICON: Record<
    ApiDatabase["public"]["Tables"]["words"]["Row"]["status"],
    IconData
> = {
    New: Check,
    Learn: Check,
    Learned: Check,
};

const b = block("WordStatusIcon");

export interface WordStatusIconProps extends Omit<IconProps, "data"> {
    status: ApiDatabase["public"]["Tables"]["words"]["Row"]["status"];
}

export const WordStatusIcon: React.FC<WordStatusIconProps> = ({ status, ...iconProps }) => {
    return (
        <Icon
            {...iconProps}
            data={WORD_STATUS_TO_ICON[status]}
            className={classNames(b("", { [status]: true }), iconProps.className)}
        />
    );
};
