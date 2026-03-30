import React from "react";

import { Tab, Tabs } from "@heroui/tabs";
import { useIsRouteMatched } from "@languages-learner/react-router-utils";

import { WorkspaceLayout } from "@/pages/workspace/layout";
import { MD_MIN_WIDTH_QUERY, useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { intl } from "@/shared/i18n";
import { getPathWithCurrentLocale, useNavigate } from "@/shared/react-router";
import { officeRoutes } from "@/shared/routes";

export interface OfficeLayoutProps extends React.PropsWithChildren {
    title: string;
}

export const OfficeLayout: React.FC<OfficeLayoutProps> = ({ title, children }) => {
    const navigate = useNavigate();
    const isRouteMatched = useIsRouteMatched();
    /** Assume desktop tabs on SSR until hydrated (matches previous behavior). */
    const isMdUp = useMediaQuery(MD_MIN_WIDTH_QUERY, () => true);

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
            <div className={"grid grid-cols-1 gap-5 md:grid-cols-[200px_1fr]"}>
                <div className="min-w-0 overflow-x-auto md:w-[200px] md:overflow-visible">
                    <Tabs
                        isVertical={isMdUp}
                        size="lg"
                        variant="light"
                        classNames={{
                            base: "w-full min-w-max md:min-w-0",
                            tabList: "w-full",
                            tab: isMdUp ? "h-12" : "h-10",
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
                <div className="min-w-0">
                    <div className={"mb-5"}>
                        <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
                    </div>
                    {children}
                </div>
            </div>
        </WorkspaceLayout>
    );
};
