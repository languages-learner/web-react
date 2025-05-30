import React from "react";

import { Menu, Text, spacing } from "@gravity-ui/uikit";

import { WorkspaceLayout } from "@/pages/workspace/layout";
import { block } from "@/shared/classNames";
import { intl } from "@/shared/i18n";
import { getPathWithCurrentLocale, useIsMatched, useNavigate } from "@/shared/react-router";
import { officeRoutes } from "@/shared/routes";

import "./OfficeLayout.scss";

const b = block("OfficeLayout");

export interface OfficeLayoutProps extends React.PropsWithChildren {
    title: string;
}

export const OfficeLayout: React.FC<OfficeLayoutProps> = ({ title, children }) => {
    const navigate = useNavigate();
    const isMatched = useIsMatched();

    return (
        <WorkspaceLayout>
            <div className={b()}>
                <div className={b("menu")}>
                    <Menu size={"xl"} className={b("menu-container")}>
                        <Menu.Item
                            className={b("menu-item")}
                            onClick={() => navigate(officeRoutes.profile)}
                            active={isMatched(getPathWithCurrentLocale(officeRoutes.profile))}
                        >
                            {intl.formatMessage({
                                defaultMessage: "Profile",
                                id: "itPgxd",
                            })}
                        </Menu.Item>
                        <Menu.Item
                            className={b("menu-item")}
                            onClick={() => navigate(officeRoutes.settings)}
                            active={isMatched(getPathWithCurrentLocale(officeRoutes.settings))}
                        >
                            {intl.formatMessage({
                                defaultMessage: "Settings",
                                id: "D3idYv",
                            })}
                        </Menu.Item>
                    </Menu>
                </div>
                <div className={b("content")}>
                    <div className={spacing({ mb: 5 })}>
                        <Text variant={"header-2"}>{title}</Text>
                    </div>
                    {children}
                </div>
            </div>
        </WorkspaceLayout>
    );
};
