import { translationKeys } from "../../../managers/translations/manager";

const wallpaperBrowserBuilder = {
  addBrowser() {
    const wallpaper_browser = document.getElementById("wallpaper-browser")!;
    const wallpaper_browser_header = document.createElement("div");
    wallpaper_browser_header.className = "browser-header";

    const title = document.createElement("p");
    title.className = "text";
    title.id = "wallpaper-browser-title";
    title.setAttribute(
      "translation-key",
      translationKeys.wallpaperBrowserTitle,
    );

    wallpaper_browser_header.appendChild(title);

    wallpaper_browser.appendChild(wallpaper_browser_header);
  },
};

export { wallpaperBrowserBuilder };
