import { execSync } from "node:child_process";
import fs from "node:fs";
import process from "node:process";

import { BUNDLE_STATS_BASELINE_DIR, BUNDLE_STATS_DIR } from "../../project.config";

const TEMP_CONTAINER_NAME = "temp-container";

const args = process.argv.slice(2);
const imageArgIndex = args.indexOf("--docker-image");
const dockerImage =
    imageArgIndex !== -1 && args[imageArgIndex + 1] ? args[imageArgIndex + 1] : null;
const withBaseline = args.includes("--baseline");

if (!dockerImage) {
    console.error("Error: provide docker image name using '--docker-image [NAME]'");
    process.exit(1);
}

console.log(`Using Docker image: ${dockerImage}`);

if (fs.existsSync(BUNDLE_STATS_DIR)) {
    console.log("Clear bundle-stats...");
    fs.rmSync(`./${BUNDLE_STATS_DIR}`, { recursive: true, force: true });
}

if (withBaseline && fs.existsSync(BUNDLE_STATS_BASELINE_DIR)) {
    console.log("Clear bundle-stats-baseline...");
    fs.rmSync(`./${BUNDLE_STATS_BASELINE_DIR}`, { recursive: true, force: true });
}

// Create temp container and copy bundle-stats
execSync(`docker create --name ${TEMP_CONTAINER_NAME} ${dockerImage}`, { stdio: "inherit" });

execSync(
    `docker cp ${TEMP_CONTAINER_NAME}:/app/apps/web/${BUNDLE_STATS_DIR} ./${BUNDLE_STATS_DIR}`,
    {
        stdio: "inherit",
    },
);
if (withBaseline) {
    execSync(
        `docker cp ${TEMP_CONTAINER_NAME}:/app/apps/web/${BUNDLE_STATS_BASELINE_DIR} ./${BUNDLE_STATS_BASELINE_DIR}`,
        {
            stdio: "inherit",
        },
    );
}

// Delete temp container
execSync(`docker rm ${TEMP_CONTAINER_NAME}`, { stdio: "inherit" });
