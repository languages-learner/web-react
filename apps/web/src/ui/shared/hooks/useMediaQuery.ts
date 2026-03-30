import { useSyncExternalStore } from "react";

/** Tailwind v4 default `md` breakpoint. */
export const MD_MIN_WIDTH_QUERY = "(min-width: 768px)";

/**
 * Subscribes to `window.matchMedia(query)` via `useSyncExternalStore` (correct for SSR / concurrent React).
 *
 * @param query - Media query string, e.g. {@link MD_MIN_WIDTH_QUERY}.
 * @param getServerSnapshot - Value used during SSR and for the server React tree. Use `() => true` if the layout should assume “query matches” until hydrated (desktop-first); `() => false` for mobile-first HTML.
 */
export const useMediaQuery = (query: string, getServerSnapshot: () => boolean): boolean => {
    return useSyncExternalStore(
        (onStoreChange) => {
            if (typeof window === "undefined") {
                return () => {};
            }
            const mq = window.matchMedia(query);
            mq.addEventListener("change", onStoreChange);

            return () => mq.removeEventListener("change", onStoreChange);
        },
        () => window.matchMedia(query).matches,
        getServerSnapshot,
    );
};
