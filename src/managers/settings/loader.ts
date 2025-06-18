import { SettingsManager, Settings, settings } from "./manager";

const SettingsLoader = {
    getValue(key: Settings): string {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null && storedValue !== "") {
            return storedValue;
        }

        const defaultValue = settings.find((s) => s.setting === key)!
            .value as string;

        SettingsManager.saveValue(key, defaultValue);

        return defaultValue;
    },
};

export { SettingsLoader };
