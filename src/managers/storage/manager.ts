import { Log } from "../../utils/logger";
import { Settings, settings } from "../settings/manager";

const StorageManager = {
  saveValue(key: Settings, value: string) {
    const setting = settings.find((s) => s.id === key)!;

    Log.Debug(`Saved value: "${value}" for setting: ${key}`);
    localStorage.setItem(key, value);
    setting.value = value;
  },
};

export { StorageManager };
