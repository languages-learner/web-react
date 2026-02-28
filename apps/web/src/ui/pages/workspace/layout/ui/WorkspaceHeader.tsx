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
                "h-(--app-layout-header-height) bg-(--color-base-generic-ultralight) grid grid-cols-[auto_1fr_1fr] gap-5 px-4 shadow-sm"
            }
        >
            <div className="flex items-center justify-start px-7">
                <Link to={landingRoutes.root} className={"flex h-full items-center"}>
                    <h1 className="text-2xl font-semibold text-success">
                        {intl.formatMessage({
                            defaultMessage: "Languages Learner",
                            id: "AGH8O0",
                        })}
                    </h1>
                </Link>
            </div>
            <div className="flex items-center">
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
            <div className="flex items-center justify-end gap-3">
                <div>
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
        </header>
    );
};
