import { SettingsMenuBuilder } from "./builders/ui/settings/builder";
import { WidgetsMenuBuilder } from "./builders/ui/widgets/builder";
import { ThemeLoader } from "./managers/themes/loader";
import { TitleLoader } from "./managers/title/loader";
import { TitleManager } from "./managers/title/manager";
import { addDebugConsole, Log } from "./utils/logger";
import { StorageLoader } from "./managers/storage/loader";
import { Settings } from "./managers/settings/manager";
import { WallpaperManager } from "./managers/wallpaper/manager";
import { GridsBuilder } from "./builders/grids/builder";
import { FontLoader } from "./managers/fonts/loader";
import { getVersion } from "./utils/tools";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  Log.Info(`Kofitab by BXn4. Version: ${getVersion()}`);
  Log.Info("Any issues? -> https://github.com/OpenXN/Kofitab/issues");
  Log.Debug("Loading config...");

  Log.Debug("Setting up tab title...");
  TitleManager.setTitle(TitleLoader.getTitle());

  Log.Debug("Setting up wallpaper...");
  WallpaperManager.setWallpaper(StorageLoader.getValue(Settings.Wallpaper));

  Log.Debug("Loading styles...");
  ThemeLoader.loadThemes(StorageLoader.getValue(Settings.Themes));

  // ThemeLoader.listAllThemes();

  Log.Debug("Injecting fonts...");
  FontLoader.injectFontsStyle();

  Log.Debug("Loading font...");
  FontLoader.loadFont(StorageLoader.getValue(Settings.Font));

  GridsBuilder.createGrids(
    Number(StorageLoader.getValue(Settings.GridRows)),
    Number(StorageLoader.getValue(Settings.GridCells)),
  );

  SettingsMenuBuilder.addSettingsMenu();
  SettingsMenuBuilder.addSettingsMenuButton();

  WidgetsMenuBuilder.addWidgetsMenu();
  WidgetsMenuBuilder.addWidgetsMenuButton();

  if (StorageLoader.getValue(Settings.DeveloperMode) == String(true)) {
    addDebugConsole();
  }
}
