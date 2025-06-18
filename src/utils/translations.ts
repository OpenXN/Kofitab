import en from "../../_locales/en/translations.json";

const allTranslations: Record<string, Record<string, string>> = { en };

function getTranslation(language: string, key: string): string {
    if (!(language in allTranslations)) {
        language = "en";
        // update the language to default -> en
    }
    const translations = allTranslations[language];
    return translations[key];
}

export { getTranslation };
