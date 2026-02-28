import { BasePlaceholderContainer } from "./BasePlaceholderContainer";
import { STATUS_ICON } from "./constants";
import type { BasePlaceholderContainerProps } from "./BasePlaceholderContainer";
import type { PlaceholderContainerStatus } from "./constants";

export interface PlaceholderContainerProps extends Omit<BasePlaceholderContainerProps, "image"> {
    status: PlaceholderContainerStatus;
}

export const PlaceholderContainer: React.FC<PlaceholderContainerProps> = ({
    status,
    ...placeholderContainerProps
}) => {
    const icon = STATUS_ICON[status];

    return <BasePlaceholderContainer image={icon({ size: 100 })} {...placeholderContainerProps} />;
};
