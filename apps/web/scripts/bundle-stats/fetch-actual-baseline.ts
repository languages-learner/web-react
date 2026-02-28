import { execSync } from "node:child_process";
import process from "node:process";

import * as dotenv from "dotenv";

import { BUNDLE_STATS_BASELINE_PATH } from "../../project.config";
import { execSyncAwsCli } from "../aws-cli/exec-sync-aws-cli";

dotenv.config();

const currentBranch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }).trim();

let forkPoint: string;

try {
    if (currentBranch === "main") {
        // Get last merge into main
        forkPoint = execSync("git rev-parse HEAD~1", {
            encoding: "utf-8",
        }).trim();
        console.log("On main — using previous commit as fork point:", forkPoint);
    } else {
        // Get fork point with main
        forkPoint = execSync("git merge-base origin/main HEAD", { encoding: "utf-8" }).trim();
        console.log("Fork point (last common commit with main):", forkPoint);
    }
} catch (err) {
    console.error("Failed to find fork point:", err);
    process.exit(1);
}

const s3BundleStatsBaselinePath = `s3://languages-learner-static/prod/commits/${forkPoint}/bundle-stats/baseline.json`;

execSyncAwsCli(
    `aws s3 cp ${s3BundleStatsBaselinePath} ${BUNDLE_STATS_BASELINE_PATH} --endpoint-url=https://storage.yandexcloud.net`,
);
