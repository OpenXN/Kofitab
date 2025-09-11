import {
  Settings,
  SettingsCategory,
  SettingType,
  settings,
} from "../../../managers/settings/manager";
import { StorageLoader } from "../../../managers/storage/loader";
import {
  translationManager,
  translationKeys,
  allTranslations,
} from "../../../managers/translations/manager";
import { Icons } from "../../../utils/icons";
import { StorageManager } from "../../../managers/storage/manager";
import { SettingsChangeListener } from "../../../listeners/settings/listener";
import fonts from "../../../fonts/fonts.json";

const SettingsMenuBuilder = {
  addSettingsMenu() {
    const settings_menu_container = document.getElementById(
      "settings-menu-container",
    )!;

    const title = document.createElement("p");
    title.className = "menu-title text";
    title.setAttribute("translation-key", translationKeys.settingsTitle);

    settings_menu_container.appendChild(title);

    const settings_category_container = document.createElement("div")!;
    settings_category_container.id = "settings-category-container";

    const categories = {
      [SettingsCategory.General]: translationKeys.settingsGeneral,
      [SettingsCategory.Appearance]: translationKeys.settingsAppearance,
      [SettingsCategory.Advanced]: translationKeys.settingsAdvanced,
    };

    const settings_footer_container = document.createElement("div")!;
    settings_footer_container.id = "settings-footer-container";

    const footerLeft = document.createElement("div");
    footerLeft.className = "footer-left";

    const version = document.createElement("span");
    version.className = "footer-version text";
    version.id = "version";
    version.setAttribute("translation-key", translationKeys.version);

    const footerInfo = document.createElement("span");
    footerInfo.className = "footer-info text";
    footerInfo.setAttribute("translation-key", translationKeys.footerInfo);

    footerLeft.appendChild(version);
    footerLeft.appendChild(footerInfo);

    const footerIcons = document.createElement("div");
    footerIcons.className = "footer-icons";

    const home = document.createElement("a");
    home.href = "https://kofitab.net";
    home.target = "_blank";
    home.className = "footer-icon";

    const homeIcon = new DOMParser().parseFromString(
      Icons.Footer.Home,
      "image/svg+xml",
    ).documentElement;

    homeIcon.setAttribute("width", "24");
    homeIcon.setAttribute("height", "24");
    homeIcon.classList = "icon";

    home.append(homeIcon);
    footerIcons.appendChild(home);

    const github = document.createElement("a");
    github.href = "https://github.com/openXN/kofitab";
    github.target = "_blank";
    github.className = "footer-icon";

    const githubIcon = new DOMParser().parseFromString(
      Icons.Footer.Github,
      "image/svg+xml",
    ).documentElement;

    githubIcon.setAttribute("width", "24");
    githubIcon.setAttribute("height", "24");
    githubIcon.classList = "icon";

    github.append(githubIcon);
    footerIcons.appendChild(github);

    settings_footer_container.appendChild(footerLeft);
    settings_footer_container.appendChild(footerIcons);

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
          setting_item.className = "settings-item";

          const setting_item_name = document.createElement("span");
          setting_item_name.className = "settings-item text";
          setting_item_name.setAttribute("translation-key", setting.id);

          // let setting_input_area: HTMLDivElement;

          let input: HTMLInputElement;
          let select: HTMLSelectElement;
          let button: HTMLButtonElement;

          let label: HTMLLabelElement;
          let slider: HTMLSpanElement;

          let container: HTMLDivElement;

          const languages = Object.keys(allTranslations);

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

              setting_item.append(setting_item_name);
              settings_input_container.appendChild(label);
              setting_item.appendChild(settings_input_container);
              break;
            case SettingType.Input:
              input = document.createElement("input");
              input.type = "text";

              input.className = "settings-type-input";
              input.id = `settings-${setting.id}`;

              if (setting.needPlaceHolder) {
                input.setAttribute(
                  "translation-key-placeholder",
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
              setting_item.append(setting_item_name);
              setting_item.appendChild(container);

              input.addEventListener("input", () => {
                SettingsChangeListener.onValueChanged(setting);
              });

              break;
            case SettingType.Select:
              select = document.createElement("select");

              select.id = `settings-${setting.id}`;
              select.className = "settings-type-select";

              switch (setting.id) {
                case Settings.Language:
                  languages.forEach((language) => {
                    const optionElement = document.createElement("option");
                    optionElement.value = language;
                    optionElement.textContent =
                      translationManager.getTranslation(
                        language,
                        translationKeys.languageName,
                      );

                    select.appendChild(optionElement);

                    select.value = StorageLoader.getValue(
                      Settings.Language,
                    ) as string;
                  });
                  break;
                case Settings.Font:
                  fonts.forEach((font) => {
                    const optionElement = document.createElement("option");
                    optionElement.value = font.name;
                    optionElement.textContent = font.name;

                    select.appendChild(optionElement);

                    select.value = StorageLoader.getValue(
                      Settings.Font,
                    ) as string;
                  });
                  break;
              }

              select.addEventListener("change", () => {
                SettingsChangeListener.onValueChanged(setting);
              });

              setting_item.append(setting_item_name);
              setting_item.appendChild(select);
              break;
            case SettingType.Button:
              button = document.createElement("button");

              button.id = `settings-${setting.id}`;
              button.className = "settings-type-button";

              if (setting.buttonTitle) {
                button.setAttribute("translation-key", setting.buttonTitle);
              }

              button.addEventListener("click", () => {
                SettingsChangeListener.onButtonPressed(setting);
              });

              setting_item.append(setting_item_name);
              setting_item.appendChild(button);
              break;
            case SettingType.Number:
              input = document.createElement("input");
              input.type = "number";

              input.id = `settings-${setting.id}`;
              input.className = "settings-type-number";

              input.value = String(setting.value);
              input.min = String(setting.minValue);
              input.max = String(setting.maxValue);

              setting_item.append(setting_item_name);
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
                input.setAttribute(
                  "translation-key-placeholder",
                  `${setting.id}PlaceHolder`,
                );
              }

              input.value = String(setting.value);

              button = document.createElement("button");

              button.id = `settings-${setting.id}`;

              setting_item.append(setting_item_name);
              setting_item.appendChild(input);
              setting_item.appendChild(button);
              break;
          }

          settings_container.appendChild(setting_item);
        }
      });

      const settings_category_title = document.createElement("p");
      settings_category_title.className = "category-title text";
      settings_category_title.setAttribute("translation-key", value);

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
      Icons.Basic.Settings,
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
