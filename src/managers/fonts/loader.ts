// Default fonts stored here with paths to fonts.
import fonts from "../../fonts/fonts.json";

const FontLoader = {
  getFontsStyle(): string {
    return fonts
      .map((font) =>
        `
@font-face {
  font-family: '${font.name}';
  src: url('${font.path}');
}
`.trim(),
      )
      .join("\n\n");
  },

  injectFontsStyle() {
    const style = document.createElement("style");
    style.textContent = this.getFontsStyle();
    document.head.appendChild(style);
  },
};

export { FontLoader };
