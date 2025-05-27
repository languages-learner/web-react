import { z } from "zod/v4";

import { getFinalFormValidation } from "@/shared/zod";

export const translationSchema = z.object({
    text: z.string().nonempty(),
    language: z.string().nonempty(),
});

export type AddWordTranslationFormType = z.infer<typeof translationSchema>;

export const validateTranslation = getFinalFormValidation(translationSchema);
