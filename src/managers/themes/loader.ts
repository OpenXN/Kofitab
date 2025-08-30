import { Log } from "../../utils/logger";
import { Theme } from "./manager";

import themes from "../../themes/themes.json";
import { StorageLoader } from "../storage/loader";
import { Settings } from "../settings/manager";

/**
 * ThemeLoader is responsible for loading custom themes:
 * - Listing all available themes (these will be loaded)
 * - Loading all themes, loading a new theme (single)
 *   - After loading its will injects it in a style tag into the DOM
 * - Unloading a theme / theme custom style
 */
const ThemeLoader = {
  /**
   * Lists all themes in console (debug) from the themes config.
   */
  listAllThemes() {
    for (const theme of themes) {
      Log.Debug(`Theme ID: ${theme.id}, Path: ${theme.path}`);
    }
  },

  /**
   * Loads all the themes from the saved localStorage. First the theme ID (default),
   * and its follows the theme parts (styles) in an array ([base, colors, animations]),
   * and each theme sepperated by '$' char.
   */

  // default[name, etc]$asd[name, etc]
  async loadThemes(ids: string) {
    const idList = ids
      .split("$")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    for (const id of idList) {
      let themeParts: string[] = [];
      const themeID = id.split("[")[0];

      if (id.includes("[")) {
        const themePart = id.split("[")[1].replace("]", "");
        themeParts = themePart.split(",").map((s) => s.trim());
        // Log.Debug(JSON.stringify(themeParts));
      }

      try {
        Log.Debug(`Loading theme: ${themeID}`);
        await this.loadTheme(themeID, themeParts);
      } catch (err) {
        // Forgot to remove the console.error. I was lazy to use the logger.
        Log.Error(`Failed to load theme: ${themeID}. Reason: ${err}`);
      }
    }
  },

  /**
   * Loads the specified theme by ID, and injects into the styles tag into the DOM.
   * If you want to load a remote theme, you need a valid theme config file, which points to an custom CSS. (TODO)
   * If the remote theme config file is invalid, it will ignores that theme. (TODO)
   */

  // Its getting worse.
  async loadTheme(id: string, themeParts: string[]) {
    // TODO: LOAD REMOTE THEMES
    //
    // Local themes (storing default themes)
    const theme = themes.find((t) => t.id === id);
    if (theme) {
      /* Log.Debug(theme.path);
      const response = await fetch(theme.path);
      const themeJson = await response.json();
      console.log(themeJson); */

      const themeConfig = await fetch(theme.path);

      const themeInfo = (await themeConfig.json()) as Theme;
      // Allowing only: base, colors, animations and extra (extra if you want to add more things).
      for (const [key, value] of Object.entries(themeInfo.parts ?? {})) {
        if (themeParts.length > 0 && !themeParts.includes(key)) {
          continue;
        }

        if (
          key == "animations" &&
          StorageLoader.getValue(Settings.EnableAnimations) == Boolean(false)
        ) {
          return;
        }

        Log.Debug(`Loading theme ${themeInfo.name} style part: ${key}`);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `../themes/${theme.id}/${value}`;
        link.id = `${themeInfo.id}-${key}`;
        document.head.appendChild(link);
      }

      Log.Debug(`Loaded theme: ${themeInfo.name} by ${themeInfo.author}`);
    } else {
      Log.Warn(`Failed to load theme: "${id}". Ignoring this theme`);
    }
  },
};

export { ThemeLoader };
