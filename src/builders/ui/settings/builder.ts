import { Settings } from "../../../managers/settings/manager";
import { SettingsLoader } from "../../../managers/settings/loader";
import { getTranslation } from "../../../utils/translations";
import { BasicIcons } from "../../../utils/icons";

const SettingsMenuBuilder = {
  addSettingsMenu() {
    const settings_menu_container = document.getElementById(
      "settings-menu-container",
    );

    if (settings_menu_container) {
      const language = SettingsLoader.getValue(Settings.Language);

      const title = document.createElement("p");
      title.className = "menu-title text";
      title.textContent = getTranslation(language, "settings-title");

      settings_menu_container.appendChild(title);

      document.body.appendChild(settings_menu_container);
    }
  },

  addSettingsMenuButton() {
    const settingsButton = document.createElement("button");
    settingsButton.id = "settings-button";

    if (SettingsLoader.getValue(Settings.SettingsButtonVisible) == "false") {
      settingsButton.classList.add("hidden");
    }

    const icon = new DOMParser().parseFromString(
      BasicIcons.Settings,
      "image/svg+xml",
    ).documentElement;
    icon.setAttribute("width", "24");
    icon.setAttribute("height", "24");
    icon.classList = "icon";

    settingsButton.appendChild(icon);

    settingsButton.addEventListener("click", this.handleClick);

    document.body.appendChild(settingsButton);
  },

  handleClick() {
    const settings_menu_container = document.getElementById(
      "settings-menu-container",
    );

    if (settings_menu_container?.className == "hidden") {
      settings_menu_container.className = "show";
    } else if (settings_menu_container?.className == "show") {
      settings_menu_container.className = "hidden";
    }
  },
};

export { SettingsMenuBuilder };
