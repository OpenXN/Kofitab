import {
  Settings,
  SettingsCategory,
  SettingType,
  settings,
  SettingsManager,
} from "../../../managers/settings/manager";
import { StorageLoader } from "../../../managers/storage/loader";
import { getTranslation, translationKeys } from "../../../utils/translations";
import { BasicIcons } from "../../../utils/icons";
import { getVersion } from "../../../utils/tools";
import { StorageManager } from "../../../managers/storage/manager";
import { Log } from "../../../utils/logger";

const SettingsMenuBuilder = {
  addSettingsMenu() {
    const settings_menu_container = document.getElementById(
      "settings-menu-container",
    )!;
    const language = SettingsManager.getSetting(Settings.Language)
      .value as string;

    const title = document.createElement("p");
    title.className = "menu-title text";
    title.textContent = getTranslation(language, translationKeys.settingsTitle);

    settings_menu_container.appendChild(title);

    const settings_category_container = document.createElement("div")!;
    settings_category_container.id = "settings-category-container";

    const categories = {
      [SettingsCategory.General]: getTranslation(
        language,
        translationKeys.settingsGeneral,
      ),
      [SettingsCategory.Appearance]: getTranslation(
        language,
        translationKeys.settingsAppearance,
      ),
      [SettingsCategory.Advanced]: getTranslation(
        language,
        translationKeys.settingsAdvanced,
      ),
    };

    const settings_footer_container = document.createElement("div")!;
    settings_footer_container.id = "settings-footer-container";

    const version = document.createElement("span");
    version.className = "text";
    version.textContent = `${getTranslation(language, translationKeys.version)}: ${getVersion()}`;
    settings_footer_container.appendChild(version);

    Object.entries(categories).forEach(([key, value]) => {
      const category_container = document.createElement("div");
      category_container.id = key + "-container";

      const settings_container = document.createElement("div");
      settings_container.className = "settings-container";

      settings.forEach((setting) => {
        if (setting.category === key) {
          const settingElement = document.createElement("div");
          settingElement.className = "settings-item text";
          settingElement.textContent = getTranslation(language, setting.id);

          let input: HTMLInputElement;
          let select: HTMLSelectElement;
          let button: HTMLButtonElement;

          switch (setting.type) {
            case SettingType.Toggle:
              input = document.createElement("input");
              input.type = "checkbox";

              input.id = `setting-${setting.id}`;

              Log.Debug(`VALUE: ${setting.value} FOR: ${setting.id} `);

              input.checked = Boolean(setting.value);

              settingElement.appendChild(input);

              input.addEventListener("change", () => {
                setting.value = input.checked;

                StorageManager.saveValue(setting.id, String(setting.value));
              });
              break;
            case SettingType.Input:
              input = document.createElement("input");
              input.type = "text";

              input.id = `setting-${setting.id}`;

              if (setting.maxLength) {
                input.maxLength = setting.maxLength;
              }

              input.value = String(setting.value);

              settingElement.appendChild(input);
              break;
            case SettingType.Select:
              select = document.createElement("select");

              select.id = `setting-${setting.id}`;

              settingElement.appendChild(select);
              break;
            case SettingType.Button:
              button = document.createElement("button");

              button.id = `setting-${setting.id}`;

              settingElement.appendChild(button);
              break;
            case SettingType.Number:
              input = document.createElement("input");
              input.type = "number";

              input.id = `setting-${setting.id}`;

              input.value = String(setting.value);
              input.min = String(setting.minValue);
              input.max = String(setting.maxValue);

              settingElement.appendChild(input);

              input.addEventListener("input", () => {
                const value = Number(input.value);
                if (value < setting.minValue!)
                  input.value = String(setting.minValue);
                if (value > setting.maxValue!)
                  input.value = String(setting.maxValue);

                setting.value = input.value;

                StorageManager.saveValue(setting.id, setting.value);
              });
              break;
            case SettingType.InputSelect:
              input = document.createElement("input");
              input.type = "text";

              input.id = `setting-${setting.id}`;

              input.value = String(setting.value);

              button = document.createElement("button");

              button.id = `setting-${setting.id}`;

              settingElement.appendChild(input);
              settingElement.appendChild(button);
              break;
          }

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
  },

  addSettingsMenuButton() {
    const settingsButton = document.createElement("button");
    settingsButton.id = "settings-button";

    const container = document.getElementById("container")!;

    if (StorageLoader.getValue(Settings.HideSettingsButton) == String(true)) {
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

    settingsButton.addEventListener("click", this.handleClick.bind(this));

    // I needed this, sorry. Easier to close the menu. Sorry about miss clicks.
    container.addEventListener("click", this.hideSettingsMenu);

    document.body.appendChild(settingsButton);
  },

  handleClick() {
    const settings_menu_container = document.getElementById(
      "settings-menu-container",
    );

    // Log.Debug(settings_menu_container!.className);

    if (settings_menu_container?.className == "hidden") {
      this.showSettingsMenu();
    } else if (settings_menu_container?.className == "show") {
      this.hideSettingsMenu();
    }
  },

  showSettingsMenu() {
    const settings_menu_container = document.getElementById(
      "settings-menu-container",
    )!;
    settings_menu_container.className = "show";
  },

  hideSettingsMenu() {
    const settings_menu_container = document.getElementById(
      "settings-menu-container",
    )!;
    settings_menu_container.className = "hidden";
  },
};

export { SettingsMenuBuilder };
