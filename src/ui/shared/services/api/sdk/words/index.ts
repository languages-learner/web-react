import { fetchWords, updateWordStatus } from "./words";

export const words = {
    fetchWords,
    updateWordStatus,
} as const;
