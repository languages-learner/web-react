import { describe, expect, it } from "vitest";

import { getErrorMessage } from "./lib";

describe("error-utils", () => {
    it("should return string error", () => {
        expect(getErrorMessage(1)).toBe("1");
    });

    it("should return null string", () => {
        expect(getErrorMessage(null)).toBe("null");
    });

    it("should return object as string", () => {
        expect(getErrorMessage({})).toBe("{}");
    });

    it("should return message of object", () => {
        expect(getErrorMessage({})).toBe("{}");
    });
});
