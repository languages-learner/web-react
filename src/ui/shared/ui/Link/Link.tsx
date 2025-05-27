import { NavLink, type NavLinkProps } from "react-router";

import { classNames } from "@/shared/classNames";

import styles from "./Link.module.scss";

export const Link = (props: NavLinkProps) => {
    return <NavLink {...props} className={classNames(styles.link, props.className)} />;
};
