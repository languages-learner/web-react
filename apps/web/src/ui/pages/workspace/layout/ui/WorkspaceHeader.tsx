import React from "react";

import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useIsRouteMatched } from "@languages-learner/react-router-utils";

import { UserAvatar } from "@/entities/user";
import { LearningLanguageSelector } from "@/features/learning-language/learningLanguageSelector";
import { Link } from "@/shared/app-ui";
import { intl } from "@/shared/i18n";
import { getPathWithCurrentLocale, useNavigate } from "@/shared/react-router";
import { landingRoutes, officeRoutes, workspaceRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";

export const WorkspaceHeader: React.FC = () => {
    const navigate = useNavigate();
    const { supabase } = useAuth();
    const isRouteMatched = useIsRouteMatched();

    return (
        <header
            className={
                "bg-(--color-base-generic-ultralight) md:h-(--app-layout-header-height) flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2 shadow-sm md:flex-nowrap md:gap-5 md:py-0"
            }
        >
            <div className="order-1 min-w-0 shrink grow basis-0 md:grow-0 md:basis-auto md:px-7">
                <Link to={landingRoutes.root} className={"flex h-full min-w-0 items-center"}>
                    <h1 className="truncate text-lg font-semibold text-success sm:text-xl md:text-2xl">
                        {intl.formatMessage({
                            defaultMessage: "Languages Learner",
                            id: "AGH8O0",
                        })}
                    </h1>
                </Link>
            </div>
            <div className="order-2 shrink-0">
                <Link to={workspaceRoutes.dictionary}>
                    <Button
                        onPress={(e) => {
                            e.continuePropagation();
                        }}
                        variant={
                            isRouteMatched(getPathWithCurrentLocale(workspaceRoutes.dictionary))
                                ? "flat"
                                : "bordered"
                        }
                        color="primary"
                    >
                        {intl.formatMessage({
                            defaultMessage: "Dictionary",
                            id: "O19okS",
                        })}
                    </Button>
                </Link>
            </div>
            <div className="order-3 shrink-0 md:order-5 md:ml-0">
                <Dropdown>
                    <DropdownTrigger>
                        <UserAvatar as={"button"} className="cursor-pointer" disableAnimation />
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="profile" onAction={() => navigate(officeRoutes.profile)}>
                            {intl.formatMessage({
                                defaultMessage: "Profile",
                                id: "itPgxd",
                            })}
                        </DropdownItem>
                        <DropdownItem
                            key="settings"
                            onAction={() => navigate(officeRoutes.settings)}
                        >
                            {intl.formatMessage({
                                defaultMessage: "Settings",
                                id: "D3idYv",
                            })}
                        </DropdownItem>
                        <DropdownItem
                            key="sign-out"
                            onAction={() => supabase.auth.signOut()}
                            color="danger"
                            className="text-danger"
                        >
                            {intl.formatMessage({
                                defaultMessage: "Sign out",
                                id: "xXbJso",
                            })}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="hidden md:order-4 md:ml-auto md:block">
                <LearningLanguageSelector
                    classNames={{
                        innerWrapper: "w-full pr-6",
                    }}
                    startContent={intl.formatMessage({
                        defaultMessage: "Learn",
                        id: "IbrSk1",
                    })}
                    fullName
                />
            </div>
        </header>
    );
};
