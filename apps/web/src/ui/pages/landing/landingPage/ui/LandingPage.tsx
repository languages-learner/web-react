import { LandingLayout } from "@/pages/landing/layout";
import { Link } from "@/shared/app-ui";
import { intl } from "@/shared/i18n";

export const LandingPage = () => {
    const currentYear = new Date().getFullYear();

    return (
        <LandingLayout>
            <div className="flex flex-col gap-5 text-center md:text-left">
                <div className="mx-auto max-w-4xl md:mx-0">
                    <h1 className="text-4xl font-semibold leading-none text-success min-[480px]:max-w-none min-[480px]:text-[8vw] md:text-7xl">
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
                <div className="mx-auto max-w-2xl md:mx-0">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                        {intl.formatMessage({
                            defaultMessage: "Web application for learning languages",
                            id: "3EElpV",
                        })}
                    </h2>
                </div>
                <div className="mx-auto max-w-xl text-balance text-sm sm:text-base md:mx-0">
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
