import { Settings } from "../settings/manager";
import { SettingsLoader } from "../settings/loader";
import { getTranslation } from "../../utils/translations";

const TitleLoader = {
  async getTitle(): Promise<string> {
    const customTitle = SettingsLoader.getValue(Settings.CustomTitle);
    if (customTitle !== null && customTitle !== "") {
      if (customTitle.length < 24) {
        // im not going to allow long titles.
        return customTitle;
      }
    }

    const language = SettingsLoader.getValue(Settings.Language);
    return getTranslation(language, "new-tab");
  },
};

export { TitleLoader };
