import { Loader } from "@languages-learner/uikit";

/** Full-viewport loader while route chunks load; same markup as SSR shell. */
export const RouteChunkFallback = () => {
    return (
        <div
            className={"flex h-screen w-full items-center justify-center"}
            aria-busy={true}
            aria-live={"polite"}
        >
            <Loader size={"lg"} />
        </div>
    );
};
