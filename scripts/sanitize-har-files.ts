import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { sanitizeHarFile as baseSanitizeHarFile } from "@languages-learner/har-sanitizer";

const projectRoot = path.resolve(__dirname, "..");
const IGNORED_FOLDERS = ["node_modules", ".git"];

async function findHarFiles(dir: string): Promise<string[]> {
    const harFiles: string[] = [];

    async function scanDir(currentDir: string) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                // Skip node_modules and .git directories
                if (IGNORED_FOLDERS.includes(entry.name)) {
                    continue;
                }
                await scanDir(fullPath);
            } else if (entry.isFile() && entry.name.endsWith(".har")) {
                harFiles.push(fullPath);
            }
        }
    }

    await scanDir(dir);

    return harFiles;
}

async function sanitizeHarFile(filePath: string) {
    try {
        await baseSanitizeHarFile(filePath);
    } catch (error: unknown) {
        console.error(`❌ Error processing ${filePath}:`, String(error));
    }
}

async function main() {
    try {
        console.info(`Searching for HAR files in: ${projectRoot}`);

        const harFiles = await findHarFiles(projectRoot);

        if (harFiles.length === 0) {
            console.info("No HAR files found.");

            return;
        }

        console.info(`Found ${harFiles.length} HAR files.`);

        for (const filePath of harFiles) {
            await sanitizeHarFile(filePath);
            execSync(`git add ${filePath}`, { stdio: "inherit" });
        }

        console.info("All HAR files have been processed.");
    } catch (error: unknown) {
        console.error("Error:", String(error));
        process.exit(1);
    }
}

main();
