import { SettingsMenuBuilder } from "./builders/ui/settings/builder";
import { WidgetsMenuBuilder } from "./builders/ui/widgets/builder";
import { ThemeLoader } from "./managers/themes/loader";
import { TitleLoader } from "./managers/title/loader";
import { TitleManager } from "./managers/title/manager";
import { addDebugConsole, Log } from "./utils/logger";
import { StorageLoader } from "./managers/storage/loader";
import {
  Settings,
  settings,
  SettingsManager,
} from "./managers/settings/manager";
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

  settings.forEach((setting) => {
    setting.value = StorageLoader.getValue(setting.id);

    // Log.Debug(`VALUE iS SET TO: ${setting.value} FOR: ${setting.id} `);
  });

  Log.Debug("Setting up tab title...");
  TitleManager.setTitle(TitleLoader.getTitle());

  Log.Debug("Setting up wallpaper...");
  WallpaperManager.setWallpaper(
    SettingsManager.getSetting(Settings.Wallpaper).value as string,
  ); // will be updated to support custom wallpapers, and going to add wallpaper browser.

  Log.Debug("Loading styles...");
  ThemeLoader.loadThemes(
    SettingsManager.getSetting(Settings.Themes).value as string,
  );

  // ThemeLoader.listAllThemes();

  Log.Debug("Injecting fonts...");
  FontLoader.injectFontsStyle();

  Log.Debug("Loading font...");
  FontLoader.loadFont(
    SettingsManager.getSetting(Settings.Font).value as string,
  );

  GridsBuilder.createGrids(
    Number(SettingsManager.getSetting(Settings.GridRows).value as number),
    Number(SettingsManager.getSetting(Settings.GridCells).value as number),
  );

  SettingsMenuBuilder.addSettingsMenu();
  SettingsMenuBuilder.addSettingsMenuButton();

  WidgetsMenuBuilder.addWidgetsMenu();
  WidgetsMenuBuilder.addWidgetsMenuButton();

  if (
    (SettingsManager.getSetting(Settings.DeveloperMode).value as boolean) ==
    true
  ) {
    addDebugConsole();
  }
}
