import { defaults } from "../../utils/consts";

const SettingsManager = {
  getSetting(key: Settings): Setting {
    const setting = settings.find((s) => s.id === key)!;
    return setting;
  },
};

enum ButtonTitles {
  Themes = "theme-browser",
}

enum Settings {
  EnableAnimations = "enableAnimations",
  HideSettingsButton = "hideSettingsButton",
  HideWidgetsButton = "hideWidgetsButton",
  Wallpaper = "wallpaper", // The wallpaper NEEDS!!! to be converted to blob if its remote to load it faster, and save it, because the source can be anytime down, or the connection slow.
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
  InputSelect = "input-select", // URL or local path. The local needs to be convert to blob.
}

interface Setting {
  id: Settings;
  category?: SettingsCategory;
  type?: SettingType;
  value?: string | boolean | number;
  minValue?: number;
  maxValue?: number;
  maxLength?: number;
  needPlaceHolder?: boolean;
  buttonTitle?: string;
  required: boolean;
}

// I should rename it, not? TODO
const settings: Setting[] = [
  {
    id: Settings.EnableAnimations,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: defaults.EnableAnimations,

    required: true,
  },
  {
    id: Settings.HideSettingsButton,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: defaults.HideSettingsButton,

    required: true,
  },
  {
    id: Settings.HideWidgetsButton,
    category: SettingsCategory.General,
    type: SettingType.Toggle,
    value: defaults.HideWidgetsButton,

    required: true,
  },
  {
    id: Settings.Wallpaper,
    category: SettingsCategory.Appearance,
    type: SettingType.Button, // Wallpapers browser
    value: defaults.Wallpaper,

    required: true,
  },
  {
    id: Settings.WallpaperFit,
    category: SettingsCategory.Appearance,
    type: SettingType.Select,
    value: defaults.WallpaperFit,

    required: true,
  },
  {
    id: Settings.CustomTitle,
    category: SettingsCategory.General,
    type: SettingType.Input,
    value: defaults.CustomTitle,
    maxLength: defaults.MaxTitleLength,
    needPlaceHolder: true,

    required: false,
  },
  {
    id: Settings.Language,
    category: SettingsCategory.General,
    type: SettingType.Select,
    value: defaults.Language,

    required: true,
  },
  {
    id: Settings.DeveloperMode,
    category: SettingsCategory.Advanced,
    type: SettingType.Toggle,
    value: defaults.DeveloperMode,

    required: true,
  },
  {
    id: Settings.Themes,
    category: SettingsCategory.Appearance,
    type: SettingType.Button,
    buttonTitle: ButtonTitles.Themes,

    value: defaults.Themes,

    required: true,
  },
  {
    id: Settings.GridRows,
    category: SettingsCategory.Advanced,
    type: SettingType.Number,
    value: defaults.GridRows,
    minValue: defaults.MinGridRows,
    maxValue: defaults.MaxGridRows,

    required: true,
  },
  {
    id: Settings.GridCells,
    category: SettingsCategory.Advanced,
    type: SettingType.Number,
    value: defaults.GridCells,
    minValue: defaults.MinGridCells,
    maxValue: defaults.MaxGridCells,

    required: true,
  },
  {
    id: Settings.Font,
    category: SettingsCategory.Appearance,
    type: SettingType.Select,
    value: defaults.Font,

    required: true,
  },
  {
    id: Settings.CustomFont,
    category: SettingsCategory.Appearance,
    type: SettingType.InputSelect,
    value: defaults.CustomFont,

    required: false,
  },
];

export {
  Settings,
  settings,
  SettingsCategory,
  SettingType,
  SettingsManager,
  Setting,
};
