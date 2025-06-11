import { testWithMockedNetworkFactory } from "@/tests/shared/playwright-utils";

export const testWithMockedNetwork = testWithMockedNetworkFactory({
    routeFromHarOptions: {
        update: Boolean(process.env.UPDATE),
    },
    forceUpdateIfHarMissing: !process.env.CI,
    url: () => {
        return "**/*supabase.co/rest/*/**";
    },
    dumpsFilePath: ({ testInfo }) => {
        const filePath = testInfo.snapshotPath(
            testInfo.titlePath.slice(1).join("-").replace(/ /g, "-").replace(/@/g, ""),
        );

        return `${filePath}.har`;
    },
});
