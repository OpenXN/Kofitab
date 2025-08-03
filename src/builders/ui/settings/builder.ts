import {
  Settings,
  SettingsCategory,
  settings,
} from "../../../managers/settings/manager";
import { SettingsLoader } from "../../../managers/settings/loader";
import { getTranslation } from "../../../utils/translations";
import { BasicIcons } from "../../../utils/icons";

import manifest from "../../../manifest.json";

enum SettingsUI {
  Toggle = `<input type="checkbox"> <span class="slider"></span>`,
}

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

      const settings_category_container = document.createElement("div");
      settings_category_container.id = "settings-category-container";

      const categories = {
        [SettingsCategory.General]: getTranslation(
          language,
          "settings-general",
        ),
        [SettingsCategory.Appearance]: getTranslation(
          language,
          "settings-appearance",
        ),
        [SettingsCategory.Advanced]: getTranslation(
          language,
          "settings-advanced",
        ),
      };

      const settings_footer_container = document.createElement("div");
      settings_footer_container.id = "settings-footer-container";

      if (settings_footer_container) {
        const version = document.createElement("span");
        version.className = "text";
        version.textContent = `Version: ${manifest.version}`;
        settings_footer_container.appendChild(version);
      }

      if (settings_category_container) {
        Object.entries(categories).forEach(([key, value]) => {
          const category_container = document.createElement("div");
          category_container.id = key + "-container";

          const settings_container = document.createElement("div");
          settings_container.className = "settings-container";

          settings.forEach((setting) => {
            if (setting.category === key) {
              const settingElement = document.createElement("div");
              settingElement.className = "settings-item text";
              settingElement.textContent = getTranslation(
                language,
                setting.setting,
              );

              settings_container.appendChild(settingElement);
            }
          });

          const settings_category_title = document.createElement("p");
          settings_category_title.className = "category-title text";
          settings_category_title.textContent = value;

          category_container.append(settings_category_title);
          category_container.append(settings_container);
          settings_category_container.append(category_container);
        });

        settings_menu_container.append(settings_category_container);
        settings_menu_container.append(settings_footer_container);

        document.body.append(settings_menu_container);
      }
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
