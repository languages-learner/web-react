import React from "react";

import { Tab, Tabs } from "@heroui/tabs";
import { useIsRouteMatched } from "@languages-learner/react-router-utils";

import { WorkspaceLayout } from "@/pages/workspace/layout";
import { intl } from "@/shared/i18n";
import { getPathWithCurrentLocale, useNavigate } from "@/shared/react-router";
import { officeRoutes } from "@/shared/routes";

export interface OfficeLayoutProps extends React.PropsWithChildren {
    title: string;
}

export const OfficeLayout: React.FC<OfficeLayoutProps> = ({ title, children }) => {
    const navigate = useNavigate();
    const isRouteMatched = useIsRouteMatched();

    const menuItems = [
        {
            key: "profile",
            title: intl.formatMessage({
                defaultMessage: "Profile",
                id: "itPgxd",
            }),
            route: officeRoutes.profile,
        },
        {
            key: "settings",
            title: intl.formatMessage({
                defaultMessage: "Settings",
                id: "D3idYv",
            }),
            route: officeRoutes.settings,
        },
    ];

    const activeMenuItem = menuItems.find((item) =>
        isRouteMatched(getPathWithCurrentLocale(item.route)),
    );

    return (
        <WorkspaceLayout>
            <div className={"grid grid-cols-[200px_1fr] gap-5"}>
                <div>
                    <Tabs
                        isVertical
                        size="lg"
                        variant="light"
                        classNames={{
                            base: "w-full",
                            tabList: "w-full",
                            tab: "h-12",
                        }}
                        color="primary"
                        selectedKey={activeMenuItem?.key}
                    >
                        {menuItems.map((item) => (
                            <Tab
                                key={item.key}
                                title={item.title}
                                onClick={() => navigate(item.route)}
                            />
                        ))}
                    </Tabs>
                </div>
                <div>
                    <div className={"mb-5"}>
                        <h2 className="text-2xl font-semibold">{title}</h2>
                    </div>
                    {children}
                </div>
            </div>
        </WorkspaceLayout>
    );
};
