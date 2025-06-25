import { execSync } from "child_process";
import * as path from "path";

import * as dotenv from "dotenv";

const envPath = path.resolve(__dirname, "../.env");
const dbTypesPath = path.resolve(
    __dirname,
    "../src/ui/shared/services/api/database.types.generated.ts",
);

dotenv.config({ path: envPath });

console.info(`Generating DB types...`);
execSync(
    `npx supabase gen types typescript --project-id "${process.env.SUPABASE_PROJECT_ID}" --schema public > ${dbTypesPath}`,
    {
        stdio: "inherit",
    },
);
