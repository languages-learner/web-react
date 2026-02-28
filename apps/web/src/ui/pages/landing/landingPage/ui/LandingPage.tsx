import { LandingLayout } from "@/pages/landing/layout";
import { Link } from "@/shared/app-ui";
import { intl } from "@/shared/i18n";

export const LandingPage = () => {
    const currentYear = new Date().getFullYear();

    return (
        <LandingLayout>
            <div className="flex flex-col gap-5">
                <div>
                    <h1 className="text-[8vw] font-semibold leading-none text-success">
                        {intl.formatMessage(
                            {
                                defaultMessage: "Languages<br></br>Learner",
                                id: "jrzPeb",
                            },
                            {
                                br: () => <br />,
                            },
                        )}
                    </h1>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold">
                        {intl.formatMessage({
                            defaultMessage: "Web application for learning languages",
                            id: "3EElpV",
                        })}
                    </h2>
                </div>
                <div className="text-base">
                    {intl.formatMessage(
                        {
                            defaultMessage:
                                "© {year}. <repo-link>languages-learner/web-react</repo-link>. Developed by <profile-link>Aleksandr Chernigin</profile-link>",
                            id: "cmJriL",
                        },
                        {
                            "repo-link": (chunks) => (
                                <Link
                                    className="underline"
                                    to="https://github.com/languages-learner/web-react"
                                    target="_blank"
                                >
                                    {chunks}
                                </Link>
                            ),
                            "profile-link": (chunks) => (
                                <Link
                                    className="underline"
                                    to="https://github.com/kvestus"
                                    target="_blank"
                                >
                                    {chunks}
                                </Link>
                            ),
                            year: currentYear,
                        },
                    )}
                </div>
            </div>
        </LandingLayout>
    );
};
