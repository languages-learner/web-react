import React from "react";

import { type Session } from "@supabase/supabase-js";

import { supabase } from "@/shared/services/api";

import { SupabaseAuthContext } from "./constants";

export const SupabaseAuthProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [isInitialized, setIsInitialized] = React.useState(false);
    const [currentSession, setCurrentSession] = React.useState<Session | null>(
        null,
    );

    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setCurrentSession(session);
            setIsInitialized(true);
        });
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const isLoggedIn = React.useMemo(
        () => Boolean(currentSession),
        [currentSession],
    );

    return isInitialized ? (
        <SupabaseAuthContext.Provider
            value={{
                session: currentSession,
                isLoggedIn,
                supabase,
            }}
        >
            {children}
        </SupabaseAuthContext.Provider>
    ) : null;
};
