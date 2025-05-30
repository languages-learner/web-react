import { NavLink, type NavLinkProps } from "react-router";

import { classNames } from "@/shared/class-names";
import { BASE_INTERFACE_LOCALE } from "@/shared/project-config";
import { getLocaleFromPath } from "@/shared/react-router";
import { patchToWithLocale } from "@/shared/react-router/locale";

import styles from "./Link.module.scss";

export type LinkProps = NavLinkProps;

export const Link = (props: LinkProps) => {
    const currentLocale = getLocaleFromPath();
    const toPath = patchToWithLocale(props.to, currentLocale ?? BASE_INTERFACE_LOCALE);

    return <NavLink {...props} className={classNames(styles.link, props.className)} to={toPath} />;
};
