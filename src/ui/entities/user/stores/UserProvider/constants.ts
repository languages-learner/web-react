import React from "react";

import { type UserContextSafe, type UserContext as UserContextType } from "../../types";

export const UserContext = React.createContext<UserContextType>({} as UserContextType);

export const useUser = () => React.useContext(UserContext);
export const useUserSafe = () => React.useContext(UserContext) as UserContextSafe;
