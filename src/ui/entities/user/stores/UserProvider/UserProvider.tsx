import React from "react";

import { idle, useQueryData } from "@gravity-ui/data-source";

import { userDataSource } from "@/entities/user";
import { useAuth } from "@/shared/services/auth";

import { type User } from "../../types";

import { UserContext } from "./constants";

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { session } = useAuth();

    const userQuery = useQueryData(userDataSource, session ? {} : idle);

    const user = React.useMemo<User | null>(() => {
        if (!session || !userQuery.data) {
            return null;
        }

        return {
            uid: session.user.id,
            displayName: session.user.user_metadata.name || session.user.email,
            email: session.user.email,
            photoURL: session.user.user_metadata.avatar_url,

            nativeLanguage: userQuery.data.native_language,
            activeLearningLanguage: userQuery.data.active_learning_language,
            interfaceLanguage: userQuery.data.interface_language,
        };
    }, [session, userQuery.data]);

    return (
        <UserContext.Provider
            value={{
                user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
