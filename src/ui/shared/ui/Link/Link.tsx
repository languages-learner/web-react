import { NavLink, type NavLinkProps } from "react-router";

import { classNames } from "@/shared/classNames";

import styles from "./Link.module.scss";

export type LinkProps = NavLinkProps;

export const Link = (props: LinkProps) => {
    return <NavLink {...props} className={classNames(styles.link, props.className)} />;
};
