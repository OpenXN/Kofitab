const WallpaperManager = {
  setWallpaper(path: string) {
    const wallpaper = document.getElementById("wallpaper") as HTMLImageElement;
    wallpaper.src = path;

    // updateSettingValue(Settings.Wallpaper, path);
  },
};

export { WallpaperManager };
