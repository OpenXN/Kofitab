import en from "../../_locales/en/translations.json";
import { SettingsManager, Settings } from "../managers/settings/manager";

const allTranslations: Record<string, Record<string, string>> = { en };

function getTranslation(language: string, key: string): string {
  if (!(language in allTranslations)) {
    language = "en";
    SettingsManager.saveValue(Settings.Language, language);
  }
  const translations = allTranslations[language];
  if (translations[key]) {
    return translations[key];
  }

  return key;
}

export { getTranslation };
