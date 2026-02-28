import { Chip } from "@heroui/chip";

export interface InlineWordTranslation {
    text: string;
    id?: string;
}

export interface InlineWordTranslationsListProps<Translation extends InlineWordTranslation> {
    translations: Translation[];
    onDeleteTranslation: (translation: Translation, index: number) => unknown;
}

export const InlineWordTranslationsList = <
    Translation extends InlineWordTranslation = InlineWordTranslation,
>({
    translations,
    onDeleteTranslation,
}: InlineWordTranslationsListProps<Translation>) => {
    return translations.map((translation, index) => (
        <Chip
            key={`${index}_${translation.text}`}
            variant="solid"
            color="success"
            radius="sm"
            onClose={() => onDeleteTranslation(translation, index)}
            classNames={{
                base: "h-8",
            }}
        >
            {translation.text}
        </Chip>
    ));
};
