import { Settings } from "../settings/manager";
import { StorageLoader } from "../storage/loader";
import { translationManager, translationKeys } from "../translations/manager";
import { defaults } from "../../utils/consts";

/**
 * Responsible to get the tab title.
 */
const TitleLoader = {
  /**
   * Returns custom title if exist, else language default.
   */
  getTitle() {
    const customTitle = StorageLoader.getValue(Settings.CustomTitle) as string;

    if (customTitle !== null && customTitle !== "") {
      // im not going to allow long titles.
      if (customTitle.length <= defaults.MaxTitleLength) {
        return customTitle;
      }
    }

    const language = StorageLoader.getValue(Settings.Language) as string;
    return translationManager.getTranslation(language, translationKeys.newTab);
  },
};

export { TitleLoader };
