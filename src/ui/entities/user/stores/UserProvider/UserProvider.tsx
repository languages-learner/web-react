import React from "react";

import { idle, useQueryData } from "@gravity-ui/data-source";
import { Loader } from "@gravity-ui/uikit";

import { DataLoader } from "@/shared/data-source";
import { useAuth } from "@/shared/services/auth";

import { userDataSource } from "../../queries/user";
import { type User, type UserContext as UserContextType } from "../../types";

import { UserContext } from "./constants";

export interface UserProviderProps {
    children: (context: UserContextType) => React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
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
            theme: userQuery.data.theme,
        };
    }, [session, userQuery.data]);

    const value: UserContextType = {
        user,
    };

    // TODO: make common loader with main-server
    const loader = () => (
        <div
            style={{
                width: "100wh",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Loader size={"l"} />
        </div>
    );

    return (
        <UserContext.Provider value={value}>
            <DataLoader
                status={userQuery.status}
                error={userQuery.error}
                errorAction={userQuery.refetch}
                LoadingView={loader}
            >
                {children(value)}
            </DataLoader>
        </UserContext.Provider>
    );
};
