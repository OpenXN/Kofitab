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
  CustomFont = "customFont",
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
  InputSelect = "input-select", // URL or local path
}

interface Setting {
  setting: Settings;
  category: SettingsCategory;
  type: SettingType;
  value: string | boolean | number;
  required: boolean;
}

// I should rename it, not? TODO
const settings: Setting[] = [
  {
    setting: Settings.EnableAnimations,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: true,
    required: true,
  },
  {
    setting: Settings.SettingsButtonVisible,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: true,
    required: true,
  },
  {
    setting: Settings.WidgetsButtonVisible,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: true,
    required: true,
  },
  {
    setting: Settings.Wallpaper,
    category: SettingsCategory.Appearance,
    type: SettingType.Input,
    value: "./assets/wallpapers/default.jpeg",
    required: true,
  },
  {
    setting: Settings.WallpaperFit,
    category: SettingsCategory.Appearance,
    type: SettingType.Select,
    value: "cover",
    required: true,
  },
  {
    setting: Settings.CustomTitle,
    category: SettingsCategory.General,
    type: SettingType.Input,
    value: "",
    required: false,
  },
  {
    setting: Settings.Language,
    category: SettingsCategory.General,
    type: SettingType.Select,
    value: "en",
    required: true,
  },
  {
    setting: Settings.DeveloperMode,
    category: SettingsCategory.Advanced,
    type: SettingType.Toggle,
    value: false,
    required: true,
  },
  {
    setting: Settings.Themes,
    category: SettingsCategory.Appearance,
    type: SettingType.Button,
    value: "default[base,colors, animations]$",
    required: true,
  },
  {
    setting: Settings.GridRows,
    category: SettingsCategory.Advanced,
    type: SettingType.Number,
    value: 14,
    required: true,
  },
  {
    setting: Settings.GridCells,
    category: SettingsCategory.Advanced,
    type: SettingType.Number,
    value: 7,
    required: true,
  },
  {
    setting: Settings.Font,
    category: SettingsCategory.Appearance,
    type: SettingType.Input,
    value: "Creato Display",
    required: true,
  },
  {
    setting: Settings.CustomFont,
    category: SettingsCategory.Appearance,
    type: SettingType.InputSelect,
    value: "",
    required: false,
  },
];

const StorageManager = {
  saveValue(key: Settings, value: string): void {
    Log.Debug(`Saved value: "${value}" for setting: ${key}`);
    localStorage.setItem(key, value);
  },
};

export { StorageManager, Settings, settings, SettingsCategory, SettingType };
