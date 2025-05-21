export interface User {
    uid: string;
    displayName: string | null;
    email?: string;
    photoURL: string | null;

    nativeLanguage: string;
    activeLearningLanguage: string;
    interfaceLanguage: string;
}

export interface UserContext {
    user: User | null;
}

export interface UserContextSafe {
    user: User;
}
