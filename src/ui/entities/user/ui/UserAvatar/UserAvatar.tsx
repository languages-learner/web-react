import React from "react";

import { GraduationCap } from "@gravity-ui/icons";
import { Avatar } from "@gravity-ui/uikit";

import { useUser } from "../../stores/UserProvider";

import styles from "./UserAvatar.module.scss";

export const UserAvatar: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    const { photoURL } = user;

    return photoURL ? (
        <Avatar className={styles.UserAvatar} imgUrl={photoURL} size={"m"} />
    ) : (
        <Avatar
            className={styles.UserAvatar}
            icon={GraduationCap}
            size="m"
            theme="brand"
            view="filled"
        />
    );
};
