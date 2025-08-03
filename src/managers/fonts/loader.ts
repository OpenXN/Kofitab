// Default fonts stored here with paths to fonts.
import fonts from "../../fonts/fonts.json";
import { Log } from "../../utils/logger";

const FontLoader = {
  getFontsStyle(): string {
    return fonts
      .map((font) =>
        `
          @font-face {
          font-family: '${font.name}';
          src: url('${font.path}');
          }`.trim(),
      )
      .join("\n\n");
  },

  injectFontsStyle() {
    const style = document.createElement("style");
    style.textContent = this.getFontsStyle();
    document.head.appendChild(style);
  },

  loadFont(name: string) {
    // Please note: Its not replacing the font for the widgets. Just for the addon.
    // Widgets can use custom fonts.
    const font = fonts.find((f) => f.name === name);

    if (!font) {
      Log.Warn(`Font ${name} was not found, ignoring custom fonts...`);
      return;
    }

    const texts = document.querySelectorAll(".text");

    texts.forEach((text) => {
      (text as HTMLElement).style.fontFamily = font.name;
    });

    Log.Debug(`Font ${font.name} was loaded!`);
  },
};

export { FontLoader };
