import en from "../../../_locales/en/translations.json";
import hu from "../../../_locales/hu/translations.json";

import { Settings } from "../settings/manager";
import { StorageManager } from "../storage/manager";
import { Log } from "../../utils/logger";
import { getVersion } from "../../utils/tools";

const allTranslations: Record<string, Record<string, string>> = { en, hu };

const translationManager = {
  getTranslation(language: string, key: string): string {
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
  },

  setTranslation(language: string) {
    const elements =
      document.querySelectorAll<HTMLElement>("[translation-key]");

    const inputPlaceholders = document.querySelectorAll<HTMLInputElement>(
      "[translation-key-placeholder]",
    );

    elements.forEach((element) => {
      const key = element.getAttribute("translation-key")!;
      element.textContent = this.getTranslation(language, key);
    });

    const version = document.getElementById("version")!;
    version.textContent = `${this.getTranslation(language, translationKeys.version)}: ${getVersion()}`;

    inputPlaceholders.forEach((input) => {
      const key = input.getAttribute("translation-key-placeholder")!;
      input.placeholder = this.getTranslation(language, key);
    });

    Log.Debug(`All texts was updated to language: ${language}`);
  },
};

const translationKeys = {
  language: "lang",
  languageName: "lang-name",
  newTab: "new-tab",

  settingsTitle: "settings-title",
  widgetsTitle: "widgets-title",
  wallpaperBrowserTitle: "wallpaper-browser-title",

  settingsGeneral: "settings-general",
  settingsAppearance: "settings-appearance",
  settingsAdvanced: "settings-advanced",

  themeBrowser: "theme-browser",
  wallpaperBrowser: "wallpaper-browser",

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

  wallpaperBrowserButtonOnline: "wallpaper-browser-button-online",
  wallpaperBrowserButtonLocal: "wallpaper-browser-button-local",

  version: "version",
  footerInfo: "footer-info",
  author: "author",
};

export { translationManager, translationKeys, allTranslations };
