import { checkIfNumber } from "../../utils/tools";
import { defaults } from "../../utils/consts";
import { Settings } from "../../managers/settings/manager";
import { StorageManager } from "../../managers/storage/manager";

const GridsBuilder = {
  createGrids(sizeX: string | number, sizeY: string | number) {
    let rows = checkIfNumber(sizeX) ? Number(sizeX) : undefined;
    let cells = checkIfNumber(sizeY) ? Number(sizeY) : undefined;

    if (
      !cells ||
      cells < defaults.MinGridCells ||
      cells > defaults.MaxGridCells
    ) {
      cells = defaults.GridCells;
      StorageManager.saveValue(Settings.GridCells, String(cells));
    }

    if (!rows || rows < defaults.MinGridRows || rows > defaults.MaxGridRows) {
      rows = defaults.GridRows;
      StorageManager.saveValue(Settings.GridRows, String(rows));
    }

    const widgets_overlay = document.getElementById("widgets-overlay")!;

    widgets_overlay.style.gridTemplateColumns = `repeat(${sizeX}, 1fr)`;
    widgets_overlay.style.gridTemplateRows = `repeat(${sizeY}, 1fr)`;

    for (let i = 0; i < cells * rows; i++) {
      const widget_area = document.createElement("div");
      widget_area.className = "widget-area visible";
      widget_area.id = `widget-area-${i}`;
      widgets_overlay.appendChild(widget_area);
    }
  },
};

export { GridsBuilder };
