import { type ZodType } from "zod/v4";

import { transformZodErrorsToFinalFormValidation } from "./transformZodErrorsToFinalFormValidation";

export const getFinalFormValidation = <Output = unknown, Input = unknown>(
    zodType: ZodType<Output, Input>,
) => {
    return (values: unknown) => {
        const { error } = zodType.safeParse(values);

        if (error) {
            return transformZodErrorsToFinalFormValidation(error);
        }

        return undefined;
    };
};
