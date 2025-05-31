import { describe, expect, it } from "vitest";

import { block } from "./classNames";

describe("classnames", () => {
    it("should return base class name", () => {
        const b = block("Test");
        expect(b()).toBe("Test");
    });

    it("should return sub-class name", () => {
        const b = block("Test");
        expect(b("Subclass")).toBe("Test__Subclass");
    });

    it("should return class name with modifier", () => {
        const b = block("Test");
        expect(b({ modifier: true })).toBe("Test Test_modifier");
    });
});
