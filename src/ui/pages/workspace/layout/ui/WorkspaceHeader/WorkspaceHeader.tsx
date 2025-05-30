import React from "react";

import { Button, Col, DropdownMenu, Flex, Row, Text } from "@gravity-ui/uikit";

import { LearningLanguageSelector } from "@/entities/learning-language";
import { UserAvatar } from "@/entities/user";
import { intl } from "@/shared/i18n";
import { landingRoutes, workspaceRoutes } from "@/shared/routes";
import { useAuth } from "@/shared/services/auth";
import { Link } from "@/shared/ui";

import styles from "./WorkspaceHeader.module.scss";

export const WorkspaceHeader: React.FC = () => {
    const { supabase } = useAuth();

    return (
        <div className={styles.workspaceHeader}>
            <Row space={{ s: 1 }} spaceRow={2} className={styles.workspaceHeaderContent}>
                <Col s={3}>
                    <Flex justifyContent={"center"}>
                        <Link to={landingRoutes.root}>
                            <Text variant={"header-1"} color={"positive"}>
                                {intl.formatMessage({
                                    defaultMessage: "Languages Learner",
                                    id: "AGH8O0",
                                })}
                            </Text>
                        </Link>
                    </Flex>
                </Col>
                <Col s={6}>
                    <Link to={workspaceRoutes.dictionary}>
                        <Button size={"l"} view={"flat"}>
                            {intl.formatMessage({
                                defaultMessage: "Dictionary",
                                id: "O19okS",
                            })}
                        </Button>
                    </Link>
                </Col>
                <Col s={3}>
                    <Flex justifyContent={"flex-end"} alignItems={"center"} gap={3}>
                        <LearningLanguageSelector />
                        <DropdownMenu
                            size={"l"}
                            renderSwitcher={({ onKeyDown, onClick }) => {
                                return (
                                    <Button
                                        className={styles.userAvatarButton}
                                        size={"l"}
                                        onClick={onClick}
                                        onKeyDown={onKeyDown}
                                    >
                                        <Button.Icon>
                                            <UserAvatar />
                                        </Button.Icon>
                                    </Button>
                                );
                            }}
                            items={[
                                {
                                    // eslint-disable-next-line no-console
                                    action: () => console.log("Rename"),
                                    text: intl.formatMessage({
                                        defaultMessage: "Profile",
                                        id: "itPgxd",
                                    }),
                                },
                                {
                                    // eslint-disable-next-line no-console
                                    action: () => console.log("Rename"),
                                    text: intl.formatMessage({
                                        defaultMessage: "Settings",
                                        id: "D3idYv",
                                    }),
                                },
                                {
                                    action: () => supabase.auth.signOut(),
                                    text: intl.formatMessage({
                                        defaultMessage: "Sign out",
                                        id: "xXbJso",
                                    }),
                                    theme: "danger",
                                },
                            ]}
                        />
                    </Flex>
                </Col>
            </Row>
        </div>
    );
};
