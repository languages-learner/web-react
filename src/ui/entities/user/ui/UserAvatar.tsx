import React from "react";

import { Avatar, type AvatarProps } from "@heroui/avatar";

import { useUser } from "../stores/UserProvider";

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
