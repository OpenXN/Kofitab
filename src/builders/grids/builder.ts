import { checkIfNumber } from "../../utils/tools";
import { defaults } from "../../utils/consts";
import { SettingsManager, Settings } from "../../managers/settings/manager";

const GridsBuilder = {
    createGrids(sizeX: string | number, sizeY: string | number) {
        let columns = checkIfNumber(sizeX) ? Number(sizeX) : null;
        let rows = checkIfNumber(sizeY) ? Number(sizeY) : null;

        if (!columns || columns <= 2 || !rows || rows <= 2) {
            columns = defaults.GridRows;
            rows = defaults.GridCells;

            SettingsManager.saveValue(Settings.GridRows, String(columns));
            SettingsManager.saveValue(Settings.GridCells, String(rows));
        }

        const widgets_overlay = document.getElementById("widgets-overlay");
        if (!widgets_overlay) return;

        widgets_overlay.style.gridTemplateColumns = `repeat(${sizeX}, 1fr)`;
        widgets_overlay.style.gridTemplateRows = `repeat(${sizeY}, 1fr)`;

        for (let i = 0; i < columns * rows; i++) {
            const widget_area = document.createElement("div");
            widget_area.className = "widget-area";
            widget_area.id = `widget-area-${i}`;
            widgets_overlay.appendChild(widget_area);
        }
    },
};

export { GridsBuilder };
