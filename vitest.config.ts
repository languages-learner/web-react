import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // https://vitest.dev/guide/common-errors#failed-to-terminate-worker
        pool: "forks",
        typecheck: {
            enabled: true,
            ignoreSourceErrors: false,
            tsconfig: "tsconfig.json",
        },
        include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    },
});
