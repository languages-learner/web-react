import { execSync } from "node:child_process";
import process from "node:process";

import { buildImage } from "./build-image";

/**
 * Runs component tests for a specific package
 */
function runTests(
    packageName: string,
    command: string,
    skipBuild: boolean = false,
    forceBuild: boolean = false,
): void {
    try {
        if (forceBuild) {
            console.log("🔨 Building Docker image (forced)...");
            buildImage();
        } else if (!skipBuild) {
            console.log("🔨 Building Docker image...");
            buildImage();
        } else {
            console.log("⏭️  Skipping Docker image build (--skip-build flag set)");
        }

        console.log(`🧪 Running component tests for package: ${packageName}`);
        console.log(`   Command: ${command}`);

        // Ensure command is executed via pnpm run if it's a script name
        const pnpmCommand = command.startsWith("run ") ? command : `run ${command}`;
        execSync(`docker compose run --rm playwright-ct --filter ${packageName} ${pnpmCommand}`, {
            stdio: "inherit",
            cwd: process.cwd(),
        });

        console.log(`✅ Tests completed for package: ${packageName}`);
    } catch (error: unknown) {
        console.error(`Error running tests for ${packageName}:`, String(error));
        process.exit(1);
    }
}

/**
 * Main function
 */
function main(): void {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.error(
            "Usage: ts-node run-tests.ts <package-name> <command> [--build|--skip-build]",
        );
        console.error("Example: ts-node run-tests.ts uikit test:component");
        console.error("Example: ts-node run-tests.ts uikit test:component --build");
        console.error("Example: ts-node run-tests.ts uikit test:component --skip-build");
        console.error("Note: SKIP_BUILD environment variable can also be used to skip build");
        process.exit(1);
    }

    const packageName = args[0];
    const command = args[1];
    // Check for --skip-build flag or SKIP_BUILD environment variable
    const skipBuild = args.includes("--skip-build") || process.env.SKIP_BUILD === "true";
    // --build flag overrides SKIP_BUILD env var
    const forceBuild = args.includes("--build");

    runTests(packageName, command, skipBuild, forceBuild);
}

if (require.main === module) {
    main();
}

export { runTests };
