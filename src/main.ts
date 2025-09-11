import { SettingsMenuBuilder } from "./builders/ui/settings/builder";
import { WidgetsMenuBuilder } from "./builders/ui/widgets/builder";
import { ThemeLoader } from "./managers/themes/loader";
import { TitleManager } from "./managers/title/manager";
import { Log } from "./utils/logger";
import { StorageLoader } from "./managers/storage/loader";
import { Settings, settings } from "./managers/settings/manager";
import { WallpaperManager } from "./managers/wallpaper/manager";
import { GridsBuilder } from "./builders/grids/builder";
import { FontLoader } from "./managers/fonts/loader";
import { getVersion } from "./utils/tools";
import { translationManager } from "./managers/translations/manager";
import { wallpaperBrowserBuilder } from "./builders/browsers/wallpaper/builder";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  Log.Info(`Kofitab by BXn4. Version: ${getVersion()}`);
  Log.Info("Any issues? -> https://github.com/OpenXN/Kofitab/issues");
  Log.Debug("Loading config...");

  settings.forEach((setting) => {
    setting.value = StorageLoader.getValue(setting.id);

    // Log.Debug(`VALUE iS SET TO: ${setting.value} FOR: ${setting.id} `);
  });

  Log.Debug("Setting up tab title...");
  TitleManager.updateTitle();

  Log.Debug("Setting up wallpaper...");
  WallpaperManager.setWallpaper(
    StorageLoader.getValue(Settings.Wallpaper) as string,
  ); // will be updated to support custom wallpapers, and going to add wallpaper browser.

  Log.Debug("Loading styles...");
  ThemeLoader.loadThemes(StorageLoader.getValue(Settings.Themes) as string);

  // ThemeLoader.listAllThemes();

  Log.Debug("Injecting fonts...");
  FontLoader.injectFontsStyle();

  Log.Debug("Loading font...");
  FontLoader.loadFont(StorageLoader.getValue(Settings.Font) as string);

  GridsBuilder.createGrids(
    Number(StorageLoader.getValue(Settings.GridRows) as number),
    Number(StorageLoader.getValue(Settings.GridCells) as number),
  );

  SettingsMenuBuilder.addSettingsMenu();
  SettingsMenuBuilder.addSettingsMenuButton();

  WidgetsMenuBuilder.addWidgetsMenu();
  WidgetsMenuBuilder.addWidgetsMenuButton();

  wallpaperBrowserBuilder.addBrowser();

  translationManager.setTranslation(
    StorageLoader.getValue(Settings.Language) as string,
  );
}
