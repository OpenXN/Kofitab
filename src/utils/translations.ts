import en from "../../_locales/en/translations.json";
import hu from "../../_locales/hu/translations.json";

import { Settings } from "../managers/settings/manager";
import { StorageManager } from "../managers/storage/manager";
import { Log } from "./logger";

const allTranslations: Record<string, Record<string, string>> = { en, hu };

function getTranslation(language: string, key: string): string {
  if (!(language in allTranslations)) {
    language = "en";
    StorageManager.saveValue(Settings.Language, language);
  }
  const translations = allTranslations[language];
  if (translations[key]) {
    return translations[key];
  }

  Log.Warn(`Missing translation key: ${key} from language: ${language}`);
  return key;
}

const translationKeys = {
  language: "lang",
  newTab: "new-tab",
  settingsTitle: "settings-title",
  widgetsTitle: "widgets-title",

  settingsGeneral: "settings-general",
  settingsAppearance: "settings-appearance",
  settingsAdvanced: "settings-advanced",

  themeBrowser: "theme-browser",

  enableAnimations: "enableAnimations",
  settingsButtonVisible: "settingsButtonVisible",
  widgetsButtonVisible: "widgetsButtonVisible",
  wallpaper: "wallpaper",
  wallpaperFit: "wallpaperFit",
  customTitle: "customTitle",
  developerMode: "developerMode",
  themes: "themes",
  gridRows: "gridRows",
  gridCells: "gridCells",
  font: "font",
  customFont: "customFont",

  dateFormat: "date-format",

  version: "version",
  author: "author",
};

export { getTranslation, translationKeys };
