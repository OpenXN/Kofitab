import { SettingsMenuBuilder } from "./builders/ui/settings/builder";
import { WidgetsMenuBuilder } from "./builders/ui/widgets/builder";
import { ThemeLoader } from "./managers/themes/loader";
import { TitleLoader } from "./managers/title/loader";
import { TitleManager } from "./managers/title/manager";
import { addDebugConsole, Log } from "./utils/logger";
import { SettingsLoader } from "./managers/settings/loader";
import { Settings } from "./managers/settings/manager";
import { setWallpaper } from "./utils/wallpaper";
import { GridsBuilder } from "./builders/grids/builder";

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

  SettingsMenuBuilder.addSettingsMenu();
  SettingsMenuBuilder.addSettingsMenuButton();

  WidgetsMenuBuilder.addWidgetsMenu();
  WidgetsMenuBuilder.addWidgetsMenuButton();

  Log.Debug("Loading styles...");

  if (SettingsLoader.getValue(Settings.EnableAnimations) == "false") {
    // NEED TO REMOVE THE ANIMATIONS SYTYLE
  }

  ThemeLoader.loadThemes(SettingsLoader.getValue(Settings.Themes));

  GridsBuilder.createGrids(
    Number(SettingsLoader.getValue(Settings.GridRows)),
    Number(SettingsLoader.getValue(Settings.GridCells)),
  );

  if (SettingsLoader.getValue(Settings.DeveloperMode) == "true") {
    addDebugConsole();
  }
}
