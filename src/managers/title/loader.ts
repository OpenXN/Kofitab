import { Settings } from "../settings/manager";
import { StorageLoader } from "../storage/loader";
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
    const customTitle = StorageLoader.getValue(Settings.CustomTitle);
    if (customTitle !== null && customTitle !== "") {
      if (customTitle.length < defaults.MaxTitleLength) {
        // im not going to allow long titles.
        return customTitle;
      }
    }

    const language = StorageLoader.getValue(Settings.Language);
    return getTranslation(language, "new-tab");
  },
};

export { TitleLoader };
