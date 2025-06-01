import {
    PlaceholderContainer as BasePlaceholderContainer,
    type PlaceholderContainerProps as BasePlaceholderContainerProps,
    Icon,
} from "@gravity-ui/uikit";

import { type PlaceholderContainerStatus, STATUS_ICON } from "./constants";

export interface PlaceholderContainerProps extends Omit<BasePlaceholderContainerProps, "image"> {
    status: PlaceholderContainerStatus;
}

export const PlaceholderContainer: React.FC<PlaceholderContainerProps> = ({
    status,
    ...placeholderContainerProps
}) => {
    return (
        <BasePlaceholderContainer
            {...placeholderContainerProps}
            image={<Icon data={STATUS_ICON[status]} size={100} />}
        />
    );
};
