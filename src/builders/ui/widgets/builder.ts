import { Settings } from "../../../managers/settings/manager";
import { StorageLoader } from "../../../managers/storage/loader";
import { translationKeys } from "../../../managers/translations/manager";
import { Icons } from "../../../utils/icons";

const WidgetsMenuBuilder = {
  addWidgetsMenu() {
    const widgets_menu_container = document.getElementById(
      "widgets-menu-container",
    )!;

    const title = document.createElement("p");
    title.className = "menu-title text";
    title.setAttribute("translation-key", translationKeys.widgetsTitle);

    widgets_menu_container.appendChild(title);

    document.body.appendChild(widgets_menu_container);
  },

  addWidgetsMenuButton() {
    const widgets_menu_button = document.createElement("button");
    widgets_menu_button.id = "widgets-button";

    const container = document.getElementById("container")!;

    if (StorageLoader.getValue(Settings.HideWidgetsButton) == Boolean(true)) {
      widgets_menu_button.classList.add("hidden");
    }

    const icon = new DOMParser().parseFromString(
      Icons.Basic.Menu,
      "image/svg+xml",
    ).documentElement;
    icon.setAttribute("width", "24");
    icon.setAttribute("height", "24");
    icon.classList = "icon";

    widgets_menu_button.appendChild(icon);

    widgets_menu_button.addEventListener("click", this.handleClick.bind(this));

    // I needed this, sorry. Easier to close the menu. Sorry about miss clicks.
    container.addEventListener("click", this.hideWidgetsMenu);

    document.body.appendChild(widgets_menu_button);
  },

  toggleHideWidgetsMenuButton(hide: boolean) {
    if (hide) {
      document.getElementById("widgets-button")!.className = "hidden";
      return;
    }

    document.getElementById("widgets-button")!.className = "";
  },

  handleClick() {
    const widgets_menu_container = document.getElementById(
      "widgets-menu-container",
    );

    if (widgets_menu_container?.className == "hidden") {
      this.showWidgetsMenu();
    } else if (widgets_menu_container?.className == "show") {
      this.hideWidgetsMenu();
    }
  },

  showWidgetsMenu() {
    const widgets_menu_container = document.getElementById(
      "widgets-menu-container",
    )!;
    widgets_menu_container.className = "show";
  },

  hideWidgetsMenu() {
    const widgets_menu_container = document.getElementById(
      "widgets-menu-container",
    )!;
    widgets_menu_container.className = "hidden";
  },
};

export { WidgetsMenuBuilder };
