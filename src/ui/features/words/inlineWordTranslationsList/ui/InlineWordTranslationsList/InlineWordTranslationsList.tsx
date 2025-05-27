import { Label } from "@gravity-ui/uikit";

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
        <Label
            key={`${index}_${translation.text}`}
            type="close"
            size={"m"}
            theme="success"
            onCloseClick={() => onDeleteTranslation(translation, index)}
        >
            {translation.text}
        </Label>
    ));
};
