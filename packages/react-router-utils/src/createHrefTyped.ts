import { generatePath } from "react-router";
import type { PathParam } from "react-router";

export type PathParams<Path extends string, P = string> = { [K in PathParam<Path>]: P };

export function createHrefTyped<T extends string>(
    maybePath: T | { path: T },
    params: PathParams<T>,
) {
    const path = typeof maybePath === "string" ? maybePath : maybePath.path;

    const paramsEncoded = { ...params };

    for (const [key, val] of Object.entries<string>(paramsEncoded)) {
        paramsEncoded[key as keyof PathParams<T>] = encodeURIComponent(val);
    }

    return generatePath(path, paramsEncoded);
}
