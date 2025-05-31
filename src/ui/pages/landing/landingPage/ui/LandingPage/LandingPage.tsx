import { Flex, Link, Text } from "@gravity-ui/uikit";
import { FormattedMessage } from "react-intl";

import { LandingLayout } from "@/pages/landing/layout";
import { block } from "@/shared/class-names";
import { intl } from "@/shared/i18n";

import "./LandingPage.scss";

const b = block("LandingPage");

export const LandingPage = () => {
    const currentYear = new Date().getFullYear();

    return (
        <LandingLayout>
            <div className={b()}>
                <Flex direction="column" gap={5}>
                    <div>
                        <Text variant={"header-1"} className={b("title")} color={"positive-heavy"}>
                            {intl.formatMessage({
                                defaultMessage: `Languages
                        Learner`,
                                id: "sCxNP9",
                            })}
                        </Text>
                    </div>
                    <div>
                        <Text variant={"header-2"}>
                            {intl.formatMessage({
                                defaultMessage: "Web application for learning languages",
                                id: "3EElpV",
                            })}
                        </Text>
                    </div>
                    <div>
                        <Text>
                            {/* eslint-disable-next-line formatjs/enforce-id */}
                            <FormattedMessage
                                id={"landing-about"}
                                defaultMessage={
                                    "© {year}. <repo-link>languages-learner/web-react</repo-link>. Developed by <profile-link>Aleksandr Chernigin</profile-link>"
                                }
                                values={{
                                    "repo-link": (chunks) => (
                                        <Link
                                            underline
                                            href="https://github.com/languages-learner/web-react"
                                            target="_blank"
                                        >
                                            {chunks}
                                        </Link>
                                    ),
                                    "profile-link": (chunks) => (
                                        <Link
                                            underline
                                            href="https://github.com/kvestus"
                                            target="_blank"
                                        >
                                            {chunks}
                                        </Link>
                                    ),
                                    year: currentYear,
                                }}
                            />
                        </Text>
                    </div>
                </Flex>
            </div>
        </LandingLayout>
    );
};
