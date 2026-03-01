import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = path.resolve(__dirname, "../..");
const TARGET_DIR = path.join(projectRoot, ".docker-package-json");

/**
 * Gets all workspace packages from pnpm-workspace.yaml
 */
function getAllWorkspacePackages(): string[] {
    const workspacePath = path.join(projectRoot, "pnpm-workspace.yaml");
    const workspaceContent = fs.readFileSync(workspacePath, "utf-8");
    const packages: string[] = [];

    // Parse pnpm-workspace.yaml (simple YAML with packages array)
    const lines = workspaceContent.split("\n");
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("-") && trimmed.includes("packages/")) {
            // Extract package name from path like "packages/*" or "apps/*"
            const match = trimmed.match(/["']?packages\/([^"']+)["']?/);
            if (match) {
                // For wildcards, we need to list actual directories
                if (match[1] === "*") {
                    const packagesDir = path.join(projectRoot, "packages");
                    if (fs.existsSync(packagesDir)) {
                        const dirs = fs.readdirSync(packagesDir, { withFileTypes: true });
                        for (const dir of dirs) {
                            if (dir.isDirectory()) {
                                packages.push(`packages/${dir.name}`);
                            }
                        }
                    }
                } else {
                    packages.push(`packages/${match[1]}`);
                }
            }
        }
        if (trimmed.startsWith("-") && trimmed.includes("apps/")) {
            const match = trimmed.match(/["']?apps\/([^"']+)["']?/);
            if (match) {
                if (match[1] === "*") {
                    const appsDir = path.join(projectRoot, "apps");
                    if (fs.existsSync(appsDir)) {
                        const dirs = fs.readdirSync(appsDir, { withFileTypes: true });
                        for (const dir of dirs) {
                            if (dir.isDirectory()) {
                                packages.push(`apps/${dir.name}`);
                            }
                        }
                    }
                } else {
                    packages.push(`apps/${match[1]}`);
                }
            }
        }
    }

    return packages;
}

/**
 * Prepares temporary directory structure with only package.json files
 */
function preparePackageJsonStructure(): void {
    // Clean up existing structure if it exists
    if (fs.existsSync(TARGET_DIR)) {
        fs.rmSync(TARGET_DIR, { recursive: true, force: true });
    }

    // Create target directory
    fs.mkdirSync(TARGET_DIR, { recursive: true });

    const allPackages = getAllWorkspacePackages();
    let copiedCount = 0;

    for (const pkgPath of allPackages) {
        const sourcePackageJson = path.join(projectRoot, pkgPath, "package.json");
        const targetPackageJson = path.join(TARGET_DIR, pkgPath, "package.json");

        if (fs.existsSync(sourcePackageJson)) {
            // Create target directory structure
            const targetDir = path.dirname(targetPackageJson);
            fs.mkdirSync(targetDir, { recursive: true });

            // Copy package.json
            fs.copyFileSync(sourcePackageJson, targetPackageJson);
            copiedCount++;
        }
    }

    console.log(`✅ Prepared package.json structure in ${TARGET_DIR}`);
    console.log(`   Copied ${copiedCount} package.json files from ${allPackages.length} packages`);
}

/**
 * Cleans up temporary directory structure
 */
function cleanupPackageJsonStructure(): void {
    if (fs.existsSync(TARGET_DIR)) {
        fs.rmSync(TARGET_DIR, { recursive: true, force: true });
        console.log(`✅ Cleaned up ${TARGET_DIR}`);
    }
}

/**
 * Main function
 */
function main(): void {
    const command = process.argv[2];

    if (command === "cleanup") {
        cleanupPackageJsonStructure();
    } else {
        preparePackageJsonStructure();
    }
}

if (require.main === module) {
    main();
}

export { preparePackageJsonStructure, cleanupPackageJsonStructure, TARGET_DIR };
