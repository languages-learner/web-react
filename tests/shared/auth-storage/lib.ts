import crypto from "crypto";

export const getAuthStorageStateFileName = (baseUrl?: string) => {
    const baseUrlHash = crypto
        .createHash("md5")
        .update(baseUrl ?? "")
        .digest("hex");

    return `auth.${baseUrlHash}.${new Date().toLocaleDateString().split("/").join("-")}.json`;
};
