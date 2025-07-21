import en from "../../_locales/en/translations.json";
import hu from "../../_locales/hu/translations.json";

import { SettingsManager, Settings } from "../managers/settings/manager";
import { Log } from "./logger";

const allTranslations: Record<string, Record<string, string>> = { en, hu };

function getTranslation(language: string, key: string): string {
  if (!(language in allTranslations)) {
    language = "en";
    SettingsManager.saveValue(Settings.Language, language);
  }
  const translations = allTranslations[language];
  if (translations[key]) {
    return translations[key];
  }

  Log.Warn(`Missing translation key: ${key} from language: ${language}`);
  return key;
}

export { getTranslation };
