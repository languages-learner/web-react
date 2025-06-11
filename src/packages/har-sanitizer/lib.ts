import fs from "fs/promises";

import { type Har } from "har-format";

export const defaultWordList = [
    "Authorization",
    "SAMLRequest",
    "SAMLResponse",
    "access_token",
    "appID",
    "assertion",
    "auth",
    "authenticity_token",
    "challenge",
    "client_id",
    "client_secret",
    "code",
    "code_challenge",
    "code_verifier",
    "email",
    "facetID",
    "fcParams",
    "id_token",
    "password",
    "refresh_token",
    "serverData",
    "shdf",
    "state",
    "token",
    "usg",
    "vses2",
    "x-client-data",
    "authorization",
    "set-cookie",
    "apikey",
    "sb-project-ref",
];

export interface SanitizeHarOptions {
    words: string[];
    stubValue: string;
}

const DEFAULT_SANITIZE_OPTIONS: SanitizeHarOptions = {
    words: defaultWordList,
    stubValue: "STUBBED_VALUE",
};

export const sanitize = (har: Har) => {
    if (har.log && har.log.entries) {
        har.log.entries.forEach((entry) => {
            if (entry.request && entry.request.headers) {
                entry.request.headers.forEach((header) => {
                    if (DEFAULT_SANITIZE_OPTIONS.words?.includes(header.name)) {
                        header.value = DEFAULT_SANITIZE_OPTIONS.stubValue;
                    }
                });
            }
            if (entry.response && entry.response.headers) {
                entry.response.headers.forEach((header) => {
                    if (DEFAULT_SANITIZE_OPTIONS.words.includes(header.name)) {
                        header.value = DEFAULT_SANITIZE_OPTIONS.stubValue;
                    }
                });
            }
        });
    }

    return har;
};

export const sanitizeHarFile = async (filePath: string) => {
    const harContent = await fs.readFile(filePath, "utf8");
    const harData = JSON.parse(harContent);
    const sanitizedContent = sanitize(harData);
    await fs.writeFile(filePath, JSON.stringify(sanitizedContent, null, 2), "utf8");
};
