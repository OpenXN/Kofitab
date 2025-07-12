import { Settings } from "../../../managers/settings/manager";
import { SettingsLoader } from "../../../managers/settings/loader";
import { getTranslation } from "../../../utils/translations";
import { BasicIcons } from "../../../utils/icons";

const WidgetsMenuBuilder = {
  addWidgetsMenu() {
    const widgets_menu_container = document.getElementById(
      "widgets-menu-container",
    );

    if (widgets_menu_container) {
      const language = SettingsLoader.getValue(Settings.Language);

      const title = document.createElement("p");
      title.className = "menu-title text";
      title.textContent = getTranslation(language, "widgets-title");

      widgets_menu_container.appendChild(title);

      document.body.appendChild(widgets_menu_container);
    }
  },

  addWidgetsMenuButton() {
    const widgets_menu_button = document.createElement("button");
    widgets_menu_button.id = "widgets-button";

    if (SettingsLoader.getValue(Settings.WidgetsButtonVisible) == "false") {
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

    widgets_menu_button.addEventListener("click", this.handleClick);

    document.body.appendChild(widgets_menu_button);
  },

  handleClick() {
    alert("click");
  },
};

export { WidgetsMenuBuilder };
