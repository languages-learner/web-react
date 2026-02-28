import { getFinalFormValidation } from "@languages-learner/zod";
import { z } from "zod/v4";

export const wordSchema = z.object({
    source: z.object({
        text: z.string().nonempty(),
        language: z.string().nonempty(),
    }),
    translations: z.array(
        z.object({
            text: z.string(),
            language: z.string().nonempty(),
        }),
    ),
});

export type WordFormType = z.infer<typeof wordSchema>;

export const validateWord = getFinalFormValidation(wordSchema);
