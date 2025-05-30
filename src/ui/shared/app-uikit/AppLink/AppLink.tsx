import { createHrefTyped, getLocaleFromPath } from "@/shared/routes";
import { Link, type LinkProps } from "@/shared/ui";

export type AppLinkProps = LinkProps;

export const AppLink = (props: AppLinkProps) => {
    const currentLocale = getLocaleFromPath();
    const toPath = typeof props.to === "string" ? props.to : "";

    return <Link {...props} to={createHrefTyped(toPath, { locale: currentLocale })} />;
};
