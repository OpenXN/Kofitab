import { Log } from "../../utils/logger";
import { Theme } from "./manager";

import themes from "../../themes/themes.json";

const ThemeLoader = {
  listAllThemes() {
    for (const theme of themes) {
      Log.Debug(`Theme ID: ${theme.id}, Path: ${theme.path}`);
    }
  },

  async loadThemes(ids: string) {
    const idList = ids
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    for (const id of idList) {
      try {
        Log.Debug(`Loading theme: ${id}`);
        await this.loadTheme(id);
      } catch (error) {
        console.error(`Failed to load theme: ${id}`, error);
      }
    }
  },

  async loadTheme(id: string) {
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
      for (const [key, value] of Object.entries(themeInfo.css ?? {})) {
        Log.Debug(`Loading theme ${themeInfo.name} CSS files: ${key}`);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `../themes/${theme.id}/${value}`;
        document.head.appendChild(link);
      }

      Log.Debug(`Loaded theme: ${themeInfo.name} by ${themeInfo.author}`);
      Log.Debug(`Theme CSS files: ${JSON.stringify(themeInfo.css)}`);
    }
  },
};

export { ThemeLoader };
