import { Folder, FolderMagnifier, Hammer } from "@gravity-ui/icons";
import { type IconData } from "@gravity-ui/uikit";

export enum PlaceholderContainerStatus {
    Empty,
    NoSearchResults,
    Error,
}

export const STATUS_ICON: Record<PlaceholderContainerStatus, IconData> = {
    [PlaceholderContainerStatus.Empty]: Folder,
    [PlaceholderContainerStatus.NoSearchResults]: FolderMagnifier,
    [PlaceholderContainerStatus.Error]: Hammer,
};
