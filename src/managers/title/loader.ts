import { getSettingValue, Settings } from "../../utils/settings";
import { getTranslation } from "../../utils/translations";

async function getTitle(): Promise<string> {
    const customTitle = getSettingValue(Settings.CustomTitle);
    if (customTitle !== null && customTitle !== "") {
        return customTitle;
    }

    const language = getSettingValue(Settings.Language);
    return getTranslation(language, "New tab");
}

export { getTitle };
