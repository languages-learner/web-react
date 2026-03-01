import { execSync } from "node:child_process";
import process from "node:process";

import { cleanupPackageJsonStructure, preparePackageJsonStructure } from "./prepare-package-json";
import { removeDanglingImages, removeOldPlaywrightCtImages } from "./cleanup-images";
import { updateDockerCompose } from "./generate-volumes";

/**
 * Builds Docker image for component tests
 */
function buildImage(): void {
    try {
        console.log("🧹 Cleaning up old Docker images...");
        removeDanglingImages();
        removeOldPlaywrightCtImages();

        console.log("📦 Preparing package.json structure...");
        preparePackageJsonStructure();
        console.log("📦 Preparing volumes for compose...");
        updateDockerCompose();

        console.log("🔨 Building Docker image...");
        execSync("docker compose build --pull playwright-ct", {
            stdio: "inherit",
            cwd: process.cwd(),
        });

        console.log("🧹 Cleaning up temporary files...");
        cleanupPackageJsonStructure();

        console.log("✅ Docker image built successfully");
    } catch (error: unknown) {
        console.error("Error building Docker image:", String(error));
        // Clean up on error
        cleanupPackageJsonStructure();
        process.exit(1);
    }
}

/**
 * Main function
 */
function main(): void {
    buildImage();
}

if (require.main === module) {
    main();
}

export { buildImage };
