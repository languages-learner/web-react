import { execSync } from "child_process";
import * as path from "path";
import { fileURLToPath } from "url";

import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../.env");
const dbTypesPath = path.resolve(__dirname, "../src/ui/shared/services/api/database.types.ts");

dotenv.config({ path: envPath });

console.info(`Generating DB types...`);
execSync(
    // eslint-disable-next-line no-undef
    `npx supabase gen types typescript --project-id "${process.env.SUPABASE_PROJECT_ID}" --schema public > ${dbTypesPath}`,
    {
        stdio: "inherit",
    },
);
