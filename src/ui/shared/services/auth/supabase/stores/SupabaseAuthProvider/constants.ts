import React from "react";

import { type Session, type SupabaseClient } from "@supabase/supabase-js";

export interface AuthState {
    session: Session | null;
    isLoggedIn: boolean;
    supabase: SupabaseClient;
}

export const SupabaseAuthContext = React.createContext<AuthState>(
    {} as AuthState,
);

export const useAuth = () => React.useContext(SupabaseAuthContext);
