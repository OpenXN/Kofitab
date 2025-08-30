import { Log } from "../../utils/logger";
import { Settings, settings, SettingType } from "../settings/manager";
import { StorageManager } from "./manager";

const StorageLoader = {
  getValue(key: Settings): string | number | boolean {
    const setting = settings.find((s) => s.id === key)!;

    let value = localStorage.getItem(key);

    if (value == null || value === "") {
      // Its always sets to default value,
      // and if the config exist in localStorage, its updates it.
      value = String(setting.value);

      if (setting.required === true) {
        Log.Warn(
          `Value was not found for setting: ${key}. Using: "${value}" as defaults`,
        );

        StorageManager.saveValue(key, value);
      }
    }

    switch (setting.type) {
      case SettingType.Toggle:
        setting.value = value === "true";
        break;
      case SettingType.Input:
        setting.value = value;
        break;
      case SettingType.Number:
        setting.value = Number(value);
        break;
      default:
        setting.value = value;
        break;
    }

    return setting.value;
  },
};

export { StorageLoader };
