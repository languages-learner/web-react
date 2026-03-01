import { classNames } from "@languages-learner/class-names";
import { patchToWithLocale } from "@languages-learner/react-router-utils";
import { NavLink } from "react-router";
import { BASE_INTERFACE_LOCALE } from "shared/project-config";
import type { NavLinkProps } from "react-router";

import { getLocaleFromPath } from "@/shared/react-router";

export type LinkProps = NavLinkProps;

export const Link = (props: LinkProps) => {
    const currentLocale = getLocaleFromPath();
    const toPath = patchToWithLocale(props.to, currentLocale ?? BASE_INTERFACE_LOCALE);

    return (
        <NavLink
            {...props}
            className={classNames("text-(--color-text-link)", props.className)}
            to={toPath}
        />
    );
};
