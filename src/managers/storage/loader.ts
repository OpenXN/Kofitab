import { Log } from "../../utils/logger";
import { StorageManager, Settings, settings } from "./manager";

const StorageLoader = {
  getValue(key: Settings): string {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null && storedValue !== "") {
      return storedValue;
    }

    const setting = settings.find((s) => s.setting === key);

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
