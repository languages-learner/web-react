import { transformZodErrorsToFinalFormValidation } from "./transformZodErrorsToFinalFormValidation";
import type { ZodType } from "zod/v4";

import type { ValidationErrors } from "./transformZodErrorsToFinalFormValidation";

export const getFinalFormValidation = <Output = unknown, Input = unknown>(
    zodType: ZodType<Output, Input>,
): ((values: unknown) => ValidationErrors | undefined) => {
    return (values: unknown) => {
        const { error } = zodType.safeParse(values);

        if (error) {
            return transformZodErrorsToFinalFormValidation(error);
        }

        return undefined;
    };
};
