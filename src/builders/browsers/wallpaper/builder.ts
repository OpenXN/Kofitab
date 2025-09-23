import { translationKeys } from "../../../managers/translations/manager";
import { Icons } from "../../../utils/icons";

const wallpaperBrowserBuilder = {
  addBrowser() {
    const wallpaper_browser = document.getElementById("wallpaper-browser")!;
    const wallpaper_browser_header = document.createElement("div");
    wallpaper_browser_header.className = "browser-header-container";

    const title = document.createElement("p");
    title.className = "text";
    title.id = "wallpaper-browser-title";
    title.setAttribute(
      "translation-key",
      translationKeys.wallpaperBrowserTitle,
    );

    const close_button = document.createElement("button");
    close_button.id = "close-button";

    const icon = new DOMParser().parseFromString(
      Icons.Browser.Close,
      "image/svg+xml",
    ).documentElement;
    icon.setAttribute("width", "24");
    icon.setAttribute("height", "24");
    icon.classList = "icon";

    close_button.appendChild(icon);
    close_button.addEventListener(
      "click",
      this.onChangeWallpaperButtonPressed.bind(this),
    );

    wallpaper_browser_header.appendChild(title);
    wallpaper_browser_header.appendChild(close_button);
    wallpaper_browser.appendChild(wallpaper_browser_header);

    const wallpaper_browser_footer = document.createElement("div");
    wallpaper_browser_footer.className = "wallpaper-browser-footer";

    const wallpaper_browser_footer_buttons_container =
      document.createElement("div");
    wallpaper_browser_footer_buttons_container.className =
      "wallpaper-browser-footer-buttons-container";

    const wallpapers_online = document.createElement("button");
    wallpapers_online.setAttribute(
      "translation-key",
      translationKeys.wallpaperBrowserButtonOnline,
    );
    wallpapers_online.className =
      "text wallpaper-browser-footer-buttons selected";

    const wallpapers_local = document.createElement("button");
    wallpapers_local.setAttribute(
      "translation-key",
      translationKeys.wallpaperBrowserButtonLocal,
    );
    wallpapers_local.className = "text wallpaper-browser-footer-buttons";

    wallpaper_browser_footer_buttons_container.appendChild(wallpapers_online);
    wallpaper_browser_footer_buttons_container.appendChild(wallpapers_local);

    wallpaper_browser_footer.appendChild(
      wallpaper_browser_footer_buttons_container,
    );
    wallpaper_browser.appendChild(wallpaper_browser_footer);

    const container = document.getElementById("container")!;

    container.addEventListener("click", () => {
      this.hideWallpaperBrowser();
    });
  },

  onChangeWallpaperButtonPressed() {
    const wallpaper_browser = document.getElementById("wallpaper-browser")!;
    if (wallpaper_browser.classList.contains("hidden")) {
      wallpaper_browser.classList.remove("hidden");
      wallpaper_browser.classList.add("show");
    } else if (wallpaper_browser.classList.contains("show")) {
      wallpaper_browser.classList.remove("show");
      wallpaper_browser.classList.add("hidden");
    }
  },

  hideWallpaperBrowser() {
    const wallpaper_browser = document.getElementById("wallpaper-browser")!;
    wallpaper_browser.classList.remove("show");
    wallpaper_browser.classList.add("hidden");
  },

  addCategoryFilterToOnline() {},

  addWallpaperToContainer() {},

  fetchOnlineWallpapers() {},

  fetchLocalWallpapers() {},
};

export { wallpaperBrowserBuilder };
