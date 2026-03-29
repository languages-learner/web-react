import type { ApiEnums } from "@languages-learner/api";

export interface User {
    uid: string;
    displayName: string | null;
    email?: string;
    photoURL: string | null;

    nativeLanguage: string;
    activeLearningLanguage: string;
    interfaceLanguage: string;
    theme: ApiEnums<"Theme">;
}

export interface UserContext {
    user: User | null;
}

export interface UserContextSafe {
    user: User;
}
