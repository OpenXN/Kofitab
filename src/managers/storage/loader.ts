import { Log } from "../../utils/logger";
import { Settings, settings, SettingType } from "../settings/manager";
import { StorageManager } from "./manager";

const StorageLoader = {
  getValue(key: Settings) {
    const setting = settings.find((s) => s.id === key);
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null && storedValue !== "") {
      switch (setting!.type) {
        case SettingType.Toggle:
          setting!.value = storedValue === "true";
          break;

        case SettingType.Input:
          setting!.value = String(storedValue);
          break;

        default:
          setting!.value = storedValue;
          break;
      }

      Log.Debug(
        `Using value from storage: ${storedValue} to setting: ${setting!.id}`,
      );

      return setting!.value;
    }

    const defaultValue = setting!.value as string;

    if (setting!.required == true) {
      Log.Warn(
        `Value was not found to setting: ${key}. Using: "${defaultValue}" as defaults`,
      );

      StorageManager.saveValue(key, defaultValue);
    }

    return defaultValue;
  },
};

export { StorageLoader };
