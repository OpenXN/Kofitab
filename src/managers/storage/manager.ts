import { Log } from "../../utils/logger";
import { Settings, settings } from "../settings/manager";

const StorageManager = {
  saveValue(key: Settings, value: string): void {
    Log.Debug(`Saved value: "${value}" for setting: ${key}`);
    localStorage.setItem(key, value);

    settings.forEach((setting) => {
      if (setting.id === key) setting.value = value;
    });
  },
};

export { StorageManager };
