import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        projects: [
            {
                extends: true,
                test: {
                    projects: ["packages/*", "apps/*"],
                },
            },
        ],
        // https://vitest.dev/guide/common-errors#failed-to-terminate-worker
        pool: "forks",
        include: ["**/*.test.ts"],
    },
});
