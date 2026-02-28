import { execSync } from "node:child_process";
import process from "node:process";

import * as dotenv from "dotenv";

dotenv.config({ override: false });

export const execSyncAwsCli = (req: string) => {
    // TODO: Before check if aws is installed and env variables are set
    return execSync(req, {
        stdio: "inherit",
        env: {
            AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
            AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
        },
    });
};
