import { useCallback } from "react";

import { useMatches } from "react-router";

export const useIsMatched = () => {
    const matches = useMatches();

    return useCallback(
        (pathname: string) => {
            let wildcardFound = false;

            return matches.some((match) => {
                let matchPathname = match.pathname;

                if (matchPathname === pathname) {
                    return true;
                }

                const wildcardParam = match.params["*"];

                if (wildcardParam && !wildcardFound) {
                    wildcardFound = matchPathname.endsWith(wildcardParam);

                    if (wildcardFound) {
                        matchPathname = matchPathname.replace(`/${wildcardParam}`, "");
                    }
                }

                return matchPathname === pathname;
            });
        },
        [matches],
    );
};
