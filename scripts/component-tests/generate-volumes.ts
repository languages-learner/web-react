import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = path.resolve(__dirname, "../..");
const DOCKER_COMPOSE_PATH = path.join(projectRoot, "docker-compose.yml");

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
 * Finds all packages with component tests
 */
function findPackagesWithComponentTests(): string[] {
    const packages: string[] = [];
    const allPackages = getAllWorkspacePackages();

    for (const pkgPath of allPackages) {
        const fullPath = path.join(projectRoot, pkgPath);
        const componentTestPath = path.join(fullPath, "tests", "component");
        if (fs.existsSync(componentTestPath)) {
            packages.push(pkgPath);
        }
    }

    return packages;
}

/**
 * Generates volumes list for all workspace packages
 */
function generateVolumesForAllPackages(): string[] {
    const volumes: string[] = [];
    const allPackages = getAllWorkspacePackages();

    // Add node_modules for all workspace packages
    for (const pkgPath of allPackages) {
        const nodeModulesPath = `/app/${pkgPath}/node_modules`;
        volumes.push(nodeModulesPath);
    }

    return volumes.sort();
}

/**
 * Updates docker-compose.yml with generated volumes using string replacement
 * to preserve formatting and comments
 */
function updateDockerCompose(): void {
    const composeContent = fs.readFileSync(DOCKER_COMPOSE_PATH, "utf-8");

    // Generate volumes for all packages (excluding root node_modules which is already in the template)
    const allVolumes = generateVolumesForAllPackages();
    const volumes = allVolumes.filter((vol) => vol !== "/app/node_modules");

    // Add cache volumes for all packages with component tests
    const cacheVolumes: string[] = [];
    const packagesWithTests = findPackagesWithComponentTests();
    if (packagesWithTests.length > 0) {
        cacheVolumes.push(`      # Prevent host from overwriting playwright cache`);
        for (const pkgPath of packagesWithTests) {
            cacheVolumes.push(`      - /app/${pkgPath}/tests/component/playwright/.cache`);
        }
    }

    // Build volumes list to insert
    const volumesList = [
        "",
        "      # Node_modules volumes (auto-generated for all workspace packages)",
        ...volumes.map((vol) => `      - ${vol}`),
        ...(cacheVolumes.length > 0 ? ["", ...cacheVolumes] : []),
    ].join("\n");

    // Replace volumes section in playwright-ct service
    // Match from "volumes:" through root node_modules to entrypoint
    // The comment and node_modules volume are on separate lines
    const volumesRegex =
        /( {2}playwright-ct:[\s\S]*?volumes:[\s\S]*?# Node_modules volumes are generated automatically based on package dependencies\s*\n\s+- \/app\/node_modules)([\s\S]*?)(\n {4}entrypoint:|$)/;
    const match = composeContent.match(volumesRegex);

    if (!match) {
        // Fallback: try to match without the comment
        const fallbackRegex =
            /( {2}playwright-ct:[\s\S]*?volumes:[\s\S]*?- \/app\/node_modules)([\s\S]*?)(\n {4}entrypoint:|$)/;
        const fallbackMatch = composeContent.match(fallbackRegex);

        if (!fallbackMatch) {
            console.error(
                "Could not find playwright-ct service volumes section in docker-compose.yml",
            );
            console.error("Expected to find: volumes section with - /app/node_modules");
            process.exit(1);
        }

        const updatedContent = composeContent.replace(fallbackRegex, `$1${volumesList}\n$3`);
        fs.writeFileSync(DOCKER_COMPOSE_PATH, updatedContent, "utf-8");
    } else {
        const updatedContent = composeContent.replace(volumesRegex, `$1${volumesList}\n$3`);
        fs.writeFileSync(DOCKER_COMPOSE_PATH, updatedContent, "utf-8");
    }

    console.log(`✅ Updated docker-compose.yml with volumes for all packages`);
    console.log(`   Generated ${volumes.length} node_modules volumes`);
    if (cacheVolumes.length > 1) {
        console.log(
            `   Added ${cacheVolumes.length - 1} cache volume(s) for packages with component tests`,
        );
    }
}

/**
 * Main function
 */
function main(): void {
    try {
        updateDockerCompose();
    } catch (error: unknown) {
        console.error("Error:", String(error));
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

export { generateVolumesForAllPackages, updateDockerCompose };
