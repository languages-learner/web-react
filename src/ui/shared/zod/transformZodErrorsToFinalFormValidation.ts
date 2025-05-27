import set from "lodash/set";
import { type ZodError } from "zod/v4";

export type AnyPropertyValidationErrors =
    | PrimitivePropertyValidationErrors
    | ObjectPropertyValidationErrors
    | ArrayPropertyValidationErrors;

export type PrimitivePropertyValidationErrors = { errors: string[] };
export type ObjectPropertyValidationErrors = {
    [property: string]: AnyPropertyValidationErrors;
};
export type ArrayPropertyValidationErrors = AnyPropertyValidationErrors[];

export type ValidationErrors = AnyPropertyValidationErrors;

export const transformZodErrorsToFinalFormValidation = (error: ZodError): ValidationErrors => {
    const isArrayResult = error.issues.some((issue) => typeof issue.path[0] === "number");
    const result: ValidationErrors = isArrayResult ? [] : {};

    for (const issue of error.issues) {
        set(result, issue.path, { errors: [issue.message] });
    }

    return result;
};

// console.log(
//     transformZodErrorsToFinalFormValidationV2({
//         issues: [
//             {
//                 expected: "string",
//                 code: "invalid_type",
//                 path: ["source"],
//                 message: "Invalid input: expected string, received undefined",
//             },
//             {
//                 origin: "string",
//                 code: "too_small",
//                 minimum: 1,
//                 path: ["translations", 1, "text", "valueA"],
//                 message: "Too small: expected string to have >1 characters",
//             },
//             {
//                 origin: "string",
//                 code: "too_small",
//                 minimum: 1,
//                 path: ["translations", 1, "text", "value"],
//                 message: "Too small: expected string to have >2 characters",
//             },
//         ],
//     }),
// );
//
// console.log(
//     transformZodErrorsToFinalFormValidationV2({
//         issues: [
//             {
//                 origin: "string",
//                 code: "too_small",
//                 minimum: 1,
//                 path: [0, "text"],
//                 message: "Too small: expected string to have >1 characters",
//             },
//             {
//                 origin: "string",
//                 code: "too_small",
//                 minimum: 1,
//                 path: [3, "text"],
//                 message: "Too small: expected string to have >2 characters",
//             },
//         ],
//     }),
// );
