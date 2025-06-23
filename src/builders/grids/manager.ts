const GridsManager = {
    createGrids(sizeX: number, sizeY: number) {
        const widgets_overlay = document.getElementById("widgets-overlay");
        if (!widgets_overlay) return;

        widgets_overlay.style.gridTemplateColumns = `repeat(${sizeX}, 1fr)`;
        widgets_overlay.style.gridTemplateRows = `repeat(${sizeY}, 1fr)`;

        for (let i = 0; i < sizeX * sizeY; i++) {
            const widget_area = document.createElement("div");
            widget_area.className = "widget-area";
            widget_area.id = `widget-area-${i}`;
            widgets_overlay.appendChild(widget_area);
        }
    },
};

export { GridsManager };
