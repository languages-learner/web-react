import { execSync } from "node:child_process";
import process from "node:process";

const IMAGE_NAME_PATTERN = "playwright-ct";

/**
 * Gets all Docker images matching the pattern
 */
function getDockerImages(pattern: string): Array<{ id: string; tags: string[] }> {
    try {
        const output = execSync(`docker images --format "{{.ID}}\t{{.Repository}}:{{.Tag}}"`, {
            encoding: "utf-8",
        });

        const images: Array<{ id: string; tags: string[] }> = [];
        const lines = output
            .trim()
            .split("\n")
            .filter((line) => line.trim());

        for (const line of lines) {
            const [id, ...tagParts] = line.split("\t");
            const tag = tagParts.join("\t");

            if (tag.includes(pattern) || id) {
                const existingImage = images.find((img) => img.id === id);
                if (existingImage) {
                    if (tag && tag !== "<none>:<none>") {
                        existingImage.tags.push(tag);
                    }
                } else {
                    images.push({
                        id: id || "",
                        tags: tag && tag !== "<none>:<none>" ? [tag] : [],
                    });
                }
            }
        }

        return images;
    } catch (error: unknown) {
        console.error("Error getting Docker images:", String(error));

        return [];
    }
}

/**
 * Removes dangling images (images with <none> tag)
 */
function removeDanglingImages(): void {
    try {
        console.log("Removing dangling images...");
        execSync("docker image prune -f", { stdio: "inherit" });
        console.log("✅ Dangling images removed");
    } catch (error: unknown) {
        console.error("Error removing dangling images:", String(error));
    }
}

/**
 * Removes old playwright-ct images
 */
function removeOldPlaywrightCtImages(): void {
    const images = getDockerImages(IMAGE_NAME_PATTERN);
    const playwrightCtImages = images.filter((img) =>
        img.tags.some((tag) => tag.includes(IMAGE_NAME_PATTERN)),
    );

    if (playwrightCtImages.length === 0) {
        console.log("No playwright-ct images found to remove");

        return;
    }

    console.log(`Found ${playwrightCtImages.length} playwright-ct image(s) to remove:`);
    for (const img of playwrightCtImages) {
        console.log(`  - ${img.tags.join(", ") || img.id}`);
    }

    for (const img of playwrightCtImages) {
        try {
            // Try to remove by tag first, then by ID
            if (img.tags.length > 0) {
                for (const tag of img.tags) {
                    try {
                        execSync(`docker rmi -f ${tag}`, { stdio: "pipe" });
                        console.log(`✅ Removed image: ${tag}`);
                    } catch {
                        // Try by ID if tag removal fails
                        execSync(`docker rmi -f ${img.id}`, { stdio: "pipe" });
                        console.log(`✅ Removed image: ${img.id}`);
                    }
                }
            } else if (img.id) {
                execSync(`docker rmi -f ${img.id}`, { stdio: "pipe" });
                console.log(`✅ Removed image: ${img.id}`);
            }
        } catch (error: unknown) {
            console.warn(
                `⚠️  Could not remove image ${img.tags.join(", ") || img.id}:`,
                String(error),
            );
        }
    }
}

/**
 * Main function
 */
function main(): void {
    try {
        removeDanglingImages();
        removeOldPlaywrightCtImages();
    } catch (error: unknown) {
        console.error("Error:", String(error));
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

export { removeDanglingImages, removeOldPlaywrightCtImages };
