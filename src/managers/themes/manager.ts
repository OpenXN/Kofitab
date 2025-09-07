import { Log } from "../../utils/logger";

interface Theme {
  id?: string;
  name?: string;
  category?: string;
  author?: string;
  description?: string;
  parts?: Record<string, string>;
  schemes?: Record<string, Schemes>;
  defaultScheme?: string;
  thumbnail?: string;
  path?: string; // Using external themes are allowed!
}

interface Schemes {
  name: string;
  file: string;
  thumbnail: string;
}

const ThemeManager = {
  /**
   * Unloads a specified theme, and removes it from the DOM, and from the enabled themes from the localStorage. (TODO)
   */
  unloadTheme(id: string) {
    const style = document.getElementById(id);
    if (style?.parentNode) {
      style.parentNode.removeChild(style);
      Log.Debug(`Unloaded theme: ${id}`);
    }
  },

  /**
   * Just removes the theme / style from the DOM.
   */
  removeFromDOM(id: string) {
    const style = document.getElementById(id);
    if (style?.parentNode) {
      style.parentNode.removeChild(style);
      Log.Debug(`Unloaded theme/style: ${id}`);
    } else {
      Log.Warn(
        `Cannot unload theme/style from DOM, because: '${id}' was not found.`,
      );
    }
  },
};

export { Theme, ThemeManager };
