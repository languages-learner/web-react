import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import type { MessageDescriptor } from "react-intl";

// Configuration
const PRE_COMMIT = Boolean(process.env.PRE_COMMIT);
const LOCALES_DIR = path.relative(process.cwd(), path.resolve("src/locales"));
const EXTRACTED_FILE = path.join(LOCALES_DIR, "extracted.json");
const COMPILED_DIR = path.join(LOCALES_DIR, "compiled");
const LANGUAGES = ["en", "ru"];
const DEFAULT_LANGUAGE = "en";

// Ensure directories exist
if (!fs.existsSync(LOCALES_DIR)) {
    fs.mkdirSync(LOCALES_DIR, { recursive: true });
}

if (!fs.existsSync(COMPILED_DIR)) {
    fs.mkdirSync(COMPILED_DIR, { recursive: true });
}

// Step 1: Extract messages from source code
console.info("Extracting messages from source code...");
try {
    execSync("npm run i18n:extract", { stdio: "inherit" });
    if (PRE_COMMIT) {
        execSync(`git add ${EXTRACTED_FILE}`, { stdio: "inherit" });
    }
    console.info("✅ Messages extracted successfully");
} catch (error) {
    console.error("❌ Failed to extract messages:", String(error));
    process.exit(1);
}

// Step 2: Read the extracted messages
let extractedMessages: Record<string, MessageDescriptor>;
try {
    extractedMessages = JSON.parse(fs.readFileSync(EXTRACTED_FILE, "utf8"));
    console.info(`Found ${Object.keys(extractedMessages).length} messages in extracted file`);
} catch (error) {
    console.error("❌ Failed to read extracted messages:", String(error));
    process.exit(1);
}

// Step 3: Update language files
for (const lang of LANGUAGES) {
    const langFile = path.join(LOCALES_DIR, `${lang}.json`);
    let existingTranslations: Record<string, MessageDescriptor> = {};

    // Try to read existing translations
    try {
        if (fs.existsSync(langFile)) {
            existingTranslations = JSON.parse(fs.readFileSync(langFile, "utf8"));
            console.info(
                `Found existing ${lang} translations with ${Object.keys(existingTranslations).length} messages`,
            );
        }
    } catch (error) {
        console.warn(`⚠️ Could not read existing ${lang} translations:`, String(error));
    }

    // Create updated translations
    const updatedTranslations: Record<string, MessageDescriptor> = {};
    let newCount = 0;
    let existingCount = 0;

    // For each message in the extracted file
    Object.entries(extractedMessages).forEach(([messageId, message]) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (existingTranslations[messageId]) {
            // Keep existing translation
            updatedTranslations[messageId] = existingTranslations[messageId];
            existingCount++;
        } else {
            // For default language, just copy the message
            if (lang === DEFAULT_LANGUAGE) {
                updatedTranslations[messageId] = message;
            } else {
                // For other languages, mark as needing translation
                updatedTranslations[messageId] = {
                    ...message,
                    defaultMessage: `[NEEDS_TRANSLATION] ${message.defaultMessage}`,
                };
            }
            newCount++;
        }
    });

    // Write updated translations back to file
    fs.writeFileSync(langFile, JSON.stringify(updatedTranslations, null, 2), "utf8");
    if (PRE_COMMIT) {
        execSync(`git add ${langFile}`, { stdio: "inherit" });
    }
    if (newCount > 0) {
        console.info(
            `✅ Updated ${lang} translations (${existingCount} existing, ${newCount} new)`,
        );
    }

    // Compile the translations
    const compiledFile = path.join(COMPILED_DIR, `${lang}.json`);
    try {
        execSync(
            `npx formatjs compile ${langFile.replace(/\\/g, "/")} --out-file ${compiledFile.replace(/\\/g, "/")}`,
            {
                stdio: "inherit",
            },
        );
        console.info(`✅ Compiled ${lang} translations`);
    } catch (error) {
        console.error(`❌ Failed to compile ${lang} translations:`, String(error));
    }
}
