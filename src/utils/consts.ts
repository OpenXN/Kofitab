const BASE_URL = "https://kofitab.net/";
const THEMES_URL = `${BASE_URL}themes`;
const THEMES_BASE = `${BASE_URL}files/themes`;

const defaults = {
  EnableAnimations: true,
  HideSettingsButton: false,
  HideWidgetsButton: false,
  Wallpaper: "./assets/wallpapers/default.jpeg",
  WallpaperFit: "cover",
  CustomTitle: "",
  Language: "en",
  DeveloperMode: false,
  Themes: "default[base, animations]$",
  GridRows: 14,
  GridCells: 7,
  MinGridRows: 2,
  MaxGridRows: 34,
  MinGridCells: 2,
  MaxGridCells: 20,
  MaxTitleLength: 24,
  Font: "Caviar Dreams",
  CustomFont: "",
};

export { BASE_URL, THEMES_URL, THEMES_BASE, defaults };
