import { getFinalFormValidation } from "@languages-learner/zod";
import { z } from "zod/v4";

export const translationSchema = z.object({
    text: z.string().nonempty(),
    language: z.string().nonempty(),
});

export type AddWordTranslationFormType = z.infer<typeof translationSchema>;

export const validateTranslation = getFinalFormValidation(translationSchema);
