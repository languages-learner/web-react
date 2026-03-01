import React from "react";

import { Avatar } from "@heroui/avatar";
import { useUser } from "../stores/UserProvider";
import type { AvatarProps } from "@heroui/avatar";

export type UserAvatarProps = Omit<AvatarProps, "src" | "name">;

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    const { photoURL, displayName, email } = user;

    return (
        <Avatar src={photoURL ?? undefined} name={displayName ?? email} radius="sm" {...props} />
    );
};
