import { Settings, SettingsManager } from "../settings/manager";
import { getTranslation } from "../../utils/translations";
import { defaults } from "../../utils/consts";

/**
 * Responsible to get the tab title.
 */
const TitleLoader = {
  /**
   * Returns custom title if exist, else language default.
   */
  getTitle() {
    const setting = SettingsManager.getSetting(Settings.CustomTitle);
    if (setting.value !== null && setting.value !== "") {
      // im not going to allow long titles.
      if (String(setting.value).length < defaults.MaxTitleLength) {
        return setting.value as string;
      }
    }

    const language = SettingsManager.getSetting(Settings.Language)
      .value as string;
    return getTranslation(language, "new-tab");
  },
};

export { TitleLoader };
