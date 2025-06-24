enum Settings {
    EnableAnimations = "enableAnimations",
    SettingsButtonVisible = "settingsButtonVisible",
    MenuButtonVisible = "menuButtonVisible",
    Wallpaper = "wallpaper",
    WallpaperFit = "wallpaperFit",
    CustomTitle = "customTitle",
    Language = "language",
    DeveloperMode = "developerMode",
    Themes = "themes",
    GridRows = "gridRows",
    GridCells = "gridCells",
}

enum SettingsCategory {
    General = "general",
    Appearance = "appearance",
    Advanced = "advanced",
}

enum SettingType {
    Toggle = "toggle",
    Input = "input",
    Select = "select",
    Button = "button",
}

interface Setting {
    setting: Settings;
    category: SettingsCategory;
    type: SettingType;
    value: string | boolean | number;
}

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
        setting: Settings.MenuButtonVisible,
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
        value: "default, animations",
    },
    {
        setting: Settings.GridRows,
        category: SettingsCategory.Advanced,
        type: SettingType.Input,
        value: 14,
    },
    {
        setting: Settings.GridCells,
        category: SettingsCategory.Advanced,
        type: SettingType.Input,
        value: 7,
    },
];

const SettingsManager = {
    saveValue(key: Settings, value: string): void {
        localStorage.setItem(key, value);
    },
};

export { SettingsManager, Settings, settings };
