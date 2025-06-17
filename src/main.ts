import { loadThemes } from "./managers/themes/loader";
import { Log } from "./utils/logger";
import { getSettingValue, Settings } from "./utils/settings";
import { setWallpaper } from "./utils/wallpaper";

document.addEventListener("DOMContentLoaded", () => {
    init();
});

async function init() {
    Log.Debug("Initing Kofitab addon...");
    Log.Debug("Loading config...");

    Log.Debug("Setting up wallpaper...");
    setWallpaper(getSettingValue(Settings.Wallpaper));

    Log.Debug("Loading styles...");

    loadThemes(getSettingValue(Settings.Themes));

    // loadStyle("default");
}
