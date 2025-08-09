import { Log } from "../../utils/logger";

enum Settings {
  EnableAnimations = "enableAnimations",
  SettingsButtonVisible = "settingsButtonVisible",
  WidgetsButtonVisible = "widgetsButtonVisible",
  Wallpaper = "wallpaper",
  WallpaperFit = "wallpaperFit",
  CustomTitle = "customTitle",
  Language = "language",
  DeveloperMode = "developerMode",
  Themes = "themes",
  GridRows = "gridRows",
  GridCells = "gridCells",
  Font = "font",
}

enum SettingsCategory {
  General = "general",
  Appearance = "appearance",
  Advanced = "advanced",
}

enum SettingType {
  Toggle = "toggle",
  Input = "input",
  Number = "number",
  Select = "select",
  Button = "button",
}

interface Setting {
  setting: Settings;
  category: SettingsCategory;
  type: SettingType;
  value: string | boolean | number;
}

// I should rename it, not? TODO
const settings: Setting[] = [
  {
    setting: Settings.EnableAnimations,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: true,
  },
  {
    setting: Settings.SettingsButtonVisible,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: true,
  },
  {
    setting: Settings.WidgetsButtonVisible,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: true,
  },
  {
    setting: Settings.Wallpaper,
    category: SettingsCategory.Appearance,
    type: SettingType.Input,
    value: "./assets/wallpapers/default.jpeg",
  },
  {
    setting: Settings.WallpaperFit,
    category: SettingsCategory.Appearance,
    type: SettingType.Select,
    value: "cover",
  },
  {
    setting: Settings.CustomTitle,
    category: SettingsCategory.General,
    type: SettingType.Input,
    value: "",
  },
  {
    setting: Settings.Language,
    category: SettingsCategory.General,
    type: SettingType.Select,
    value: "en",
  },
  {
    setting: Settings.DeveloperMode,
    category: SettingsCategory.Advanced,
    type: SettingType.Toggle,
    value: false,
  },
  {
    setting: Settings.Themes,
    category: SettingsCategory.Appearance,
    type: SettingType.Button,
    value: "default[base,colors, animations]$",
  },
  {
    setting: Settings.GridRows,
    category: SettingsCategory.Advanced,
    type: SettingType.Number,
    value: 14,
  },
  {
    setting: Settings.GridCells,
    category: SettingsCategory.Advanced,
    type: SettingType.Number,
    value: 7,
  },
  {
    setting: Settings.Font,
    category: SettingsCategory.Appearance,
    type: SettingType.Input,
    value: "Creato Display",
  },
];

const SettingsManager = {
  saveValue(key: Settings, value: string): void {
    Log.Debug(`Saved value: "${value}" for setting: ${key}`);
    localStorage.setItem(key, value);
  },
};

export { SettingsManager, Settings, settings, SettingsCategory, SettingType };
