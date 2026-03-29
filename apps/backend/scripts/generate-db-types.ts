import { execSync } from "node:child_process";
import * as path from "node:path";
import * as fs from "node:fs";

import * as dotenv from "dotenv";

const envPath = path.resolve(__dirname, "../../../.env");
const dbTypesPath = path.resolve(__dirname, "../src/types/database.types.ts");
const apiDbTypesPath = path.resolve(__dirname, "../../../packages/api/src/database.types.ts");

dotenv.config({ path: envPath });

console.info(`Generating DB types...`);
execSync(
    `pnpx supabase gen types typescript --project-id "${process.env.SUPABASE_PROJECT_ID}" --schema public > ${dbTypesPath}`,
    {
        stdio: "inherit",
    },
);

console.info(`Copying database.types.ts to packages/api/src/...`);
fs.copyFileSync(dbTypesPath, apiDbTypesPath);
console.info(`Database types copied successfully to packages/api/src/database.types.ts`);
