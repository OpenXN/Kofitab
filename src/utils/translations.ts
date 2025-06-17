import en from "../../_locales/en/translations.json";

const allTranslations: Record<string, Record<string, string>> = { en };

function getTranslation(language: string, key: string): string {
    const translations = allTranslations[language];
    return translations[key];
}

export { getTranslation };
