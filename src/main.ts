import { SettingsButtonManager } from "./builders/ui/settings/manager";
import { MenuButtonManager } from "./builders/ui/menu/manager";
import { ThemeLoader } from "./managers/themes/loader";
import { TitleLoader } from "./managers/title/loader";
import { TitleManager } from "./managers/title/manager";
import { Log } from "./utils/logger";
import { SettingsLoader } from "./managers/settings/loader";
import { Settings } from "./managers/settings/manager";
import { setWallpaper } from "./utils/wallpaper";
import { GridsManager } from "./builders/grids/manager";

document.addEventListener("DOMContentLoaded", () => {
    init();
});

async function init() {
    Log.Debug("Initing Kofitab addon...");
    Log.Debug("Loading config...");

    Log.Debug("Setting up tab title...");
    TitleManager.setTitle(await TitleLoader.getTitle());

    Log.Debug("Setting up wallpaper...");
    setWallpaper(SettingsLoader.getValue(Settings.Wallpaper));

    SettingsButtonManager.addButton();
    MenuButtonManager.addButton();

    Log.Debug("Loading styles...");

    if (!SettingsLoader.getValue(Settings.EnableAnimations)) {
        //
    }

    ThemeLoader.loadThemes(SettingsLoader.getValue(Settings.Themes));

    GridsManager.createGrids(14, 7);
}
