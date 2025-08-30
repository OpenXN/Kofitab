import { Settings, SettingsManager } from "../../../managers/settings/manager";
import { getTranslation } from "../../../utils/translations";
import { BasicIcons } from "../../../utils/icons";

const WidgetsMenuBuilder = {
  addWidgetsMenu() {
    const widgets_menu_container = document.getElementById(
      "widgets-menu-container",
    )!;

    const language = SettingsManager.getSetting(Settings.Language)
      .value as string;

    const title = document.createElement("p");
    title.className = "menu-title text";
    title.textContent = getTranslation(language, "widgets-title");

    widgets_menu_container.appendChild(title);

    document.body.appendChild(widgets_menu_container);
  },

  addWidgetsMenuButton() {
    const widgets_menu_button = document.createElement("button");
    widgets_menu_button.id = "widgets-button";

    const container = document.getElementById("container")!;

    if (SettingsManager.getSetting(Settings.HideWidgetsButton).value == true) {
      widgets_menu_button.classList.add("hidden");
    }

    const icon = new DOMParser().parseFromString(
      BasicIcons.Menu,
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
