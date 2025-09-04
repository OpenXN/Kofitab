import {
  Settings,
  SettingsCategory,
  SettingType,
  settings,
} from "../../../managers/settings/manager";
import { StorageLoader } from "../../../managers/storage/loader";
import { getTranslation, translationKeys } from "../../../utils/translations";
import { BasicIcons } from "../../../utils/icons";
import { getVersion } from "../../../utils/tools";
import { StorageManager } from "../../../managers/storage/manager";

import { SettingsChangeListener } from "../../../listeners/settings/listener";

const SettingsMenuBuilder = {
  addSettingsMenu() {
    const settings_menu_container = document.getElementById(
      "settings-menu-container",
    )!;
    const language = StorageLoader.getValue(Settings.Language) as string;

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
        const settings_input_container = document.createElement("div");
        settings_input_container.className = "settings-input-container";

        if (setting.category === key) {
          const setting_item = document.createElement("div");
          setting_item.className = "settings-item text";
          setting_item.textContent = getTranslation(language, setting.id);

          // let setting_input_area: HTMLDivElement;

          let input: HTMLInputElement;
          let select: HTMLSelectElement;
          let button: HTMLButtonElement;

          let label: HTMLLabelElement;
          let slider: HTMLSpanElement;

          let container: HTMLDivElement;

          switch (setting.type) {
            case SettingType.Toggle:
              label = document.createElement("label");
              label.className = "switch";

              input = document.createElement("input");
              input.type = "checkbox";
              input.className = "settings-type-toggle";
              input.id = `settings-${setting.id}`;
              input.checked = Boolean(setting.value);

              slider = document.createElement("span");
              slider.className = "slider round";
              label.appendChild(input);
              label.appendChild(slider);

              input.addEventListener("change", () => {
                SettingsChangeListener.onValueChanged(setting);
              });

              settings_input_container.appendChild(label);

              setting_item.appendChild(settings_input_container);
              break;
            case SettingType.Input:
              input = document.createElement("input");
              input.type = "text";

              input.className = "settings-type-input";
              input.id = `settings-${setting.id}`;

              if (setting.needPlaceHolder) {
                input.placeholder = getTranslation(
                  language,
                  `${setting.id}PlaceHolder`,
                );
              }

              container = document.createElement("div");

              container.className = "settings-type-input-container";

              input.value = String(setting.value);

              container.appendChild(input);

              if (setting.maxLength) {
                input.maxLength = setting.maxLength;

                const settings_input_max_length =
                  document.createElement("span");
                settings_input_max_length.className =
                  "settings-input-max-length";
                settings_input_max_length.id = `settings-${setting.id}-max-length`;
                settings_input_max_length.textContent = String(
                  setting.maxLength - String(setting.value).length,
                );

                container.appendChild(settings_input_max_length);
              }

              setting_item.appendChild(container);

              input.addEventListener("input", () => {
                SettingsChangeListener.onValueChanged(setting);
              });

              break;
            case SettingType.Select:
              select = document.createElement("select");

              select.id = `settings-${setting.id}`;

              setting_item.appendChild(select);
              break;
            case SettingType.Button:
              button = document.createElement("button");

              button.id = `settings-${setting.id}`;

              if (setting.buttonTitle != undefined) {
                button.textContent = getTranslation(
                  language,
                  setting.buttonTitle,
                );
              }

              setting_item.appendChild(button);
              break;
            case SettingType.Number:
              input = document.createElement("input");
              input.type = "number";

              input.id = `settings-${setting.id}`;

              input.value = String(setting.value);
              input.min = String(setting.minValue);
              input.max = String(setting.maxValue);

              setting_item.appendChild(input);

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

              input.id = `settings-${setting.id}`;
              input.className = "settings-type-input";
              if (setting.needPlaceHolder) {
                input.placeholder = getTranslation(
                  language,
                  `${setting.id}PlaceHolder`,
                );
              }

              input.value = String(setting.value);

              button = document.createElement("button");

              button.id = `settings-${setting.id}`;

              setting_item.appendChild(input);
              setting_item.appendChild(button);
              break;
          }

          settings_container.appendChild(setting_item);
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

    if (StorageLoader.getValue(Settings.HideSettingsButton) == Boolean(true)) {
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

  toggleHideSettingsMenuButton(hide: boolean) {
    if (hide) {
      document.getElementById("settings-button")!.className = "hidden";
      return;
    }

    document.getElementById("settings-button")!.className = "";
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
