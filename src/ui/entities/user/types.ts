import { type ApiTables } from "shared/services/api";

export interface User {
    uid: string;
    displayName: string | null;
    email?: string;
    photoURL: string | null;

    nativeLanguage: string;
    activeLearningLanguage: string;
    interfaceLanguage: string;
    theme: ApiTables<"user">["theme"];
}

export interface UserContext {
    user: User | null;
}

export interface UserContextSafe {
    user: User;
}
