import { BiErrorAlt, BiFolder, BiFolderMinus } from "react-icons/bi";
import type { IconType } from "react-icons/lib";

export enum PlaceholderContainerStatus {
    Empty = "Empty",
    NoSearchResults = "NoSearchResults",
    Error = "Error",
}

export const STATUS_ICON: Record<PlaceholderContainerStatus, IconType> = {
    [PlaceholderContainerStatus.Empty]: BiFolder,
    [PlaceholderContainerStatus.NoSearchResults]: BiFolderMinus,
    [PlaceholderContainerStatus.Error]: BiErrorAlt,
};
