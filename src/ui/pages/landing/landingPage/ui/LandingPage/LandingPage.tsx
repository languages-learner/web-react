import { Flex } from "@gravity-ui/uikit";

import { LandingLayout } from "@/pages/landing/layout";
import { intl } from "@/shared/i18n";

export const LandingPage = () => {
    return (
        <LandingLayout>
            <Flex justifyContent={"center"}>
                {intl.formatMessage({
                    defaultMessage: "Landing page",
                    id: "3vvIQA",
                })}
            </Flex>
        </LandingLayout>
    );
};
