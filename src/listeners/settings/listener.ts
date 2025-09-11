import { Setting, Settings } from "../../managers/settings/manager";
import { StorageManager } from "../../managers/storage/manager";
import { StorageLoader } from "../../managers/storage/loader";
import { ThemeLoader } from "../../managers/themes/loader";
import { ThemeManager } from "../../managers/themes/manager";
import { SettingsMenuBuilder } from "../../builders/ui/settings/builder";
import { WidgetsMenuBuilder } from "../../builders/ui/widgets/builder";
import { defaults } from "../../utils/consts";
import { TitleManager } from "../../managers/title/manager";
import { translationManager } from "../../managers/translations/manager";
import { FontLoader } from "../../managers/fonts/loader";

const SettingsChangeListener = {
  onValueChanged(setting: Setting) {
    const element = document.getElementById(`settings-${setting.id}`);

    switch (true) {
      case element instanceof HTMLInputElement: {
        const input = element;
        switch (setting.id) {
          case Settings.EnableAnimations:
            this.onEnableAnimationsChange(setting, input);
            break;
          case Settings.HideSettingsButton:
            this.onHideSettingsButtonChange(setting, input);
            break;
          case Settings.HideWidgetsButton:
            this.onHideWidgetsButtonChange(setting, input);
            break;
          case Settings.CustomTitle:
            this.onTitleInputChange(setting, input);
            break;
        }
        break;
      }
      case element instanceof HTMLSelectElement: {
        const select = element;
        switch (setting.id) {
          case Settings.Language:
            this.onLanguageChanged(setting, select);
            break;
          case Settings.Font:
            this.onFontChanged(setting, select);
            break;
        }
        break;
      }
    }
  },

  onButtonPressed(setting: Setting) {
    switch (setting.id) {
      case Settings.Wallpaper: {
        this.onChangeWallpaperButtonPressed();
        break;
      }
    }
  },

  onEnableAnimationsChange(setting: Setting, input: HTMLInputElement) {
    setting.value = input.checked;

    StorageManager.saveValue(setting.id, String(setting.value));

    const idList = (StorageLoader.getValue(Settings.Themes) as string)
      .split("$")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    for (const id of idList) {
      let themeParts: string[] = [];
      const themeID = id.split("[")[0];

      if (id.includes("[")) {
        const themePart = id.split("[")[1].replace("]", "");
        themeParts = themePart.split(",").map((s) => s.trim());

        // Log.Debug(JSON.stringify(themeParts));

        if (
          StorageLoader.getValue(Settings.EnableAnimations) == Boolean(false) &&
          themeParts.includes("animations")
        ) {
          ThemeManager.removeFromDOM(`${themeID}-animations`);
        }

        if (
          StorageLoader.getValue(Settings.EnableAnimations) == Boolean(true) &&
          themeParts.includes("animations")
        ) {
          ThemeLoader.loadTheme(themeID, ["animations"]);
        }
      }
    }
  },
  onHideSettingsButtonChange(setting: Setting, input: HTMLInputElement) {
    setting.value = input.checked;

    StorageManager.saveValue(setting.id, String(setting.value));

    SettingsMenuBuilder.toggleHideSettingsMenuButton(
      StorageLoader.getValue(Settings.HideSettingsButton) == Boolean(true),
    );
  },
  onHideWidgetsButtonChange(setting: Setting, input: HTMLInputElement) {
    setting.value = input.checked;

    StorageManager.saveValue(setting.id, String(setting.value));

    WidgetsMenuBuilder.toggleHideWidgetsMenuButton(
      StorageLoader.getValue(Settings.HideWidgetsButton) == Boolean(true),
    );
  },
  onTitleInputChange(setting: Setting, input: HTMLInputElement) {
    const value = input.value;
    if (value.length <= defaults.MaxTitleLength) {
      setting.value = input.value;

      if (setting.maxLength) {
        const settings_input_max_length = document.getElementById(
          `settings-${setting.id}-max-length`,
        )!;

        settings_input_max_length.textContent = String(
          setting.maxLength - value.length,
        );
      }

      StorageManager.saveValue(setting.id, setting.value);

      TitleManager.updateTitle();
    }
  },

  onLanguageChanged(setting: Setting, select: HTMLSelectElement) {
    setting.value = select.value;

    StorageManager.saveValue(setting.id, setting.value);

    translationManager.setTranslation(setting.value);
  },

  onFontChanged(setting: Setting, select: HTMLSelectElement) {
    setting.value = select.value;

    StorageManager.saveValue(setting.id, setting.value);

    FontLoader.loadFont(setting.value);
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

    const container = document.getElementById("container")!;

    // TODO: BIND ONCE ALL EVENT LISTENERS.
    container.addEventListener("click", () => {
      wallpaper_browser.classList.remove("show");
      wallpaper_browser.classList.add("hidden");
    });
  },
};

export { SettingsChangeListener };
