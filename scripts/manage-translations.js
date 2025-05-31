#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import process from "process";

// Configuration
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
    console.info("✅ Messages extracted successfully");
} catch (error) {
    console.error("❌ Failed to extract messages:", error.message);
    process.exit(1);
}

// Step 2: Read the extracted messages
let extractedMessages;
try {
    extractedMessages = JSON.parse(fs.readFileSync(EXTRACTED_FILE, "utf8"));
    console.info(`Found ${Object.keys(extractedMessages).length} messages in extracted file`);
} catch (error) {
    console.error("❌ Failed to read extracted messages:", error.message);
    process.exit(1);
}

// Step 3: Update language files
for (const lang of LANGUAGES) {
    const langFile = path.join(LOCALES_DIR, `${lang}.json`);
    let existingTranslations = {};

    // Try to read existing translations
    try {
        if (fs.existsSync(langFile)) {
            existingTranslations = JSON.parse(fs.readFileSync(langFile, "utf8"));
            console.info(
                `Found existing ${lang} translations with ${Object.keys(existingTranslations).length} messages`,
            );
        }
    } catch (error) {
        console.warn(`⚠️ Could not read existing ${lang} translations:`, error.message);
    }

    // Create updated translations
    const updatedTranslations = {};
    let newCount = 0;
    let existingCount = 0;

    // For each message in the extracted file
    Object.entries(extractedMessages).forEach(([messageId, message]) => {
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
    console.info(`✅ Updated ${lang} translations (${existingCount} existing, ${newCount} new)`);

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
        console.error(`❌ Failed to compile ${lang} translations:`, error.message);
    }
}

console.info("\n✨ Translation management complete!");
console.info("\nNext steps:");
console.info("1. Translate the messages marked with [NEEDS_TRANSLATION]");
console.info("2. Run this script again to compile the translations");

// TODO: Add to git after extracting
