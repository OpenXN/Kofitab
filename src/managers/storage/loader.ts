import { Log } from "../../utils/logger";
import { Settings, settings } from "../settings/manager";
import { StorageManager } from "./manager";

const StorageLoader = {
  getValue(key: Settings): string {
    const setting = settings.find((s) => s.id === key);
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null && storedValue !== "") {
      setting!.value = storedValue;
      return storedValue;
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
