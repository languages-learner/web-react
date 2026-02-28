import React from "react";

import type { Session, SupabaseClient } from "@supabase/supabase-js";

// import { type } from "@/shared/services/api";
import type { ApiDatabase } from "@languages-learner/api";

export interface AuthState {
    session: Session | null;
    isLoggedIn: boolean;
    supabase: SupabaseClient<ApiDatabase, "public">;
}

export const SupabaseAuthContext = React.createContext<AuthState>({} as AuthState);

export const useAuth = () => React.useContext(SupabaseAuthContext);
